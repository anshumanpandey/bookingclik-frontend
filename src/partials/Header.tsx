
import React from 'react';

export const Header = () => {

    return (
        <header className="main-header dark-header fs-header sticky">
            <div className="header-inner">
                <div className="logo-holder">
                    <a href="index.html"><img src="images/logo.png" alt="" /></a>
                </div>
                <div className="show-search-button"><i className="fa fa-search"></i> <span>Search</span></div>
                <div className="show-reg-form modal-open"><i className="fa fa-sign-in"></i>Sign In</div>
            </div>
        </header>
    );
}