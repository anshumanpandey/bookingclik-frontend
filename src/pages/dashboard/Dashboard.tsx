import React, { useState, useEffect } from 'react';
import { Header, Footer } from '../../partials';
import { useGlobalState, dispatchGlobalState } from '../../state';
import { Link, Route, RouteComponentProps } from 'react-router-dom';
import { SuppliersTable } from './SuppliersTable';
import { Paypal } from './Paypal';


export const ProfilePage: React.FC<RouteComponentProps> = ({match, location}) => {
    const [profile] = useGlobalState('profile')

    console.log(location.pathname)


    return (
        <>
            <Header />
            <div id="wrapper">
                <div className="content">
                    <div className="container" style={{ margin: 'auto' }}>
                        <section id="sec1">
                            <div className="profile-edit-wrap">
                                <div className="profile-edit-page-header">
                                    <h2>Admin Panel</h2>
                                    <div className="breadcrumbs"><a href="#">Home</a><span>Dasboard</span></div>
                                </div>
                                <div className="row">
                                    <div className="col-md-3">
                                        <div className="fixed-bar fl-wrap">
                                            <div className="user-profile-menu-wrap fl-wrap">
                                                <div className="user-profile-menu">
                                                    <h3>Main</h3>
                                                    <ul>
                                                        <li>
                                                            <Link style={{ color: (location.pathname == '/dashboard/' || location.pathname == '/dashboard') ? '#5ecfb1' : 'inherit'}} to={`${match.path}/`}>
                                                                <i className="fa fa-gears"></i>Click Counts
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link style={{ color: location.pathname == '/dashboard/payments' ? '#5ecfb1' : 'inherit'}} to={`${match.path}/payments`}>
                                                                <i className="fa fa-user-o"></i> Payments
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link style={{ color: location.pathname == '/dashboard/locations' ? '#5ecfb1' : 'inherit'}} to={`${match.path}/locations`}>
                                                                <i className="fa fa-user-o"></i> Locations
                                                            </Link>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <a href="#" onClick={(e) => {
                                                    e.preventDefault()
                                                    dispatchGlobalState({ type: 'logout' })
                                                }} className="log-out-btn">Log Out</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-9">
                                        <div className="profile-edit-container">
                                            <div className="profile-edit-header fl-wrap" style={{ marginTop: '30px' }}>
                                                <h4>Hello , <span>{profile?.client.clientname}</span></h4>
                                            </div>

                                            <Route path={`${match.path}/`} component={SuppliersTable} exact/>
                                            <Route path={`${match.path}/payments`} component={Paypal}/>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>


                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}