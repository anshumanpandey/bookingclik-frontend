import React, { useState, useEffect } from 'react';
import { Header, Footer } from '../../partials';
import useAxios from 'axios-hooks'
import { Formik } from 'formik';
import { logIn } from '../../crud/login.crud';
import { dispatchGlobalState } from '../../state';
import { useHistory } from 'react-router-dom';

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
            <Header />
            <div id="wrapper">
                <div className="content">
                    <div className="main-register fl-wrap">
                        <h3>Sign In <span>City<strong>Book</strong></span></h3>
                        <div id="tabs-container">
                            <div className="tab">
                                <div id="tab-1" className="tab-content">
                                    <div className="custom-form">
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
                                                        history.push({ pathname: '/profile' });
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
                                                        <label>{errors.clientname && touched.clientname && errors.clientname}</label>
                                                        <label>Email Address * </label>
                                                        <input
                                                            name="clientname"
                                                            type="text"
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={values.clientname}
                                                        />
                                                        <label>{errors.password && touched.password && errors.password}</label>
                                                        <label >Password * </label>
                                                        <input
                                                            name="password"
                                                            type="password"
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={values.password}
                                                        />
                                                        <button type="submit" disabled={loading} className="log-submit-btn"><span>Log In</span></button>
                                                        <div className="clearfix"></div>
                                                    </form>
                                                )}
                                        </Formik>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}