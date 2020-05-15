import React, { useState, useEffect } from 'react';
import { Header, Footer } from '../../partials';
import useAxios from 'axios-hooks'
import DataTable from 'react-data-table-component';
import { getSupplierInfo } from '../../crud/click-tracker.crud';
import { useGlobalState } from '../../state';

export const ProfilePage: React.FC = () => {
    const [{ data, loading, error }, refetch] = useAxios(getSupplierInfo())
    const [profile] = useGlobalState('profile')


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
                                                        <li><a href="dashboard.html" className="user-profile-act"><i className="fa fa-gears"></i>Dashboard</a></li>
                                                        <li><a href="dashboard-myprofile.html"><i className="fa fa-user-o"></i> Edit profile</a></li>
                                                        <li><a href="dashboard-messages.html"><i className="fa fa-envelope-o"></i> Messages <span>3</span></a></li>
                                                        <li><a href="dashboard-password.html"><i className="fa fa-unlock-alt"></i>Change Password</a></li>
                                                    </ul>
                                                </div>
                                                <div className="user-profile-menu">
                                                    <h3>Listings</h3>
                                                    <ul>
                                                        <li><a href="dashboard-listing-table.html"><i className="fa fa-th-list"></i> My listigs  </a></li>
                                                        <li><a href="dashboard-bookings.html"> <i className="fa fa-calendar-check-o"></i> Bookings <span>2</span></a></li>
                                                        <li><a href="dashboard-review.html"><i className="fa fa-comments-o"></i> Reviews </a></li>
                                                        <li><a href="dashboard-add-listing.html"><i className="fa fa-plus-square-o"></i> Add New</a></li>
                                                    </ul>
                                                </div>
                                                <a href="#" className="log-out-btn">Log Out</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-9">
                                        <div className="profile-edit-container">
                                            <div className="profile-edit-header fl-wrap" style={{ marginTop: '30px' }}>
                                                <h4>Helo , <span>{profile?.client.clientname}</span></h4>
                                            </div>

                                            <div className="statistic-container fl-wrap">
                                                <DataTable
                                                    noHeader
                                                    progressPending={loading}
                                                    columns={[
                                                        {
                                                            name: 'Supplier Name',
                                                            selector: 'clientname',
                                                        },
                                                        {
                                                            name: 'Total Click Amount',
                                                            selector: 'ClickTracks.length',
                                                        },
                                                    ]}
                                                    data={data}
                                                />
                                            </div>
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