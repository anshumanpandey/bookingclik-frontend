
import React from 'react';

export const Header = () => {

    return (
        <header style={{ backgroundColor: '#154a64' }} className="main-header dark-header fs-header sticky">
            <div className="header-inner">
                <div className="logo-holder">
                    <a href="index.html"><img style={{ height: '80%'}} src="images/logo.jpg" alt="" /></a>
                </div>
                <div className="show-search-button"><i className="fa fa-search"></i> <span>Search</span></div>
                <div className="show-reg-form modal-open"><i className="fa fa-sign-in"></i>Sign In</div>
            </div>
        </header>
    );
}