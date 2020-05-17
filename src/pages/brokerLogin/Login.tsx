import React, { useState, useEffect } from 'react';
import { Header, Footer } from '../../partials';
import useAxios from 'axios-hooks'
import { Formik } from 'formik';
import { logIn } from '../../crud/login.crud';
import { dispatchGlobalState } from '../../state';
import { useHistory } from 'react-router-dom';
import ErrorLabel from '../../partials/ErrorLabel';

interface MyFormValues {
    clientname: string
    password: string
}

export const LoginPage: React.FC = () => {
    const initialValues: MyFormValues = { clientname: '', password: '' }
    const history = useHistory()
    const [{ data, loading, error }, post] = useAxios(logIn(), { manual: true })

    return (
        <>
            <div className="main-register fl-wrap" style={{ borderRadius: 0, padding: 'unset', marginBottom: 'unset', boxShadow: 'inset' }}>
                <div className="custom-form" style={{ padding: '2rem' }}>
                    <Formik
                        initialValues={initialValues}
                        validate={values => {
                            const errors: { clientname?: string, password?: string } = {};
                            if (!values.clientname) {
                                errors.clientname = 'Required';
                            } else if (
                                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.clientname)
                            ) {
                                errors.clientname = 'Invalid email address';
                            }

                            if (!values.password) {
                                errors.password = 'Required';
                            }
                            return errors;
                        }}
                        onSubmit={(values, { setSubmitting }) => {
                            post({ data: values })
                                .then(res => {
                                    dispatchGlobalState({ type: 'token', state: res.data.token })
                                    dispatchGlobalState({ type: 'profile', state: res.data })
                                    history.push({ pathname: '/dashboard' });
                                })
                        }}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            isSubmitting,
                            /* and other goodies */
                        }) => (
                                <form onSubmit={handleSubmit} name="registerform">
                                    {error?.response?.data.error && (
                                        <div style={{ margin: 0 }} className="notification reject fl-wrap">
                                            {error?.response?.data.error}
                                            <a className="notification-close" href="#"><i className="fa fa-times"></i></a>
                                        </div>
                                    )}
                                    <ErrorLabel>{errors.clientname && touched.clientname && errors.clientname}</ErrorLabel>
                                    <label>Email Address * </label>
                                    <input
                                        style={{ background: 'white', padding: '0.5rem' }}
                                        name="clientname"
                                        type="text"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.clientname}
                                    />
                                    <ErrorLabel>{errors.password && touched.password && errors.password}</ErrorLabel>
                                    <label >Password * </label>
                                    <input
                                        style={{ background: 'white', padding: '0.5rem' }}
                                        name="password"
                                        type="password"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.password}
                                    />
                                    <button style={{ backgroundColor: '#154a64' }} type="submit" disabled={loading} className="log-submit-btn"><span>Log In</span></button>
                                    <div className="clearfix"></div>
                                </form>
                            )}
                    </Formik>
                </div>

            </div>
        </>
    )
}