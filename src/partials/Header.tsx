
import React from 'react';
import { Link } from 'react-router-dom';

export const Header = () => {

    return (
        <header style={{ backgroundColor: '#154a64' }} className="main-header dark-header fs-header sticky">
            <div className="header-inner" style={{ 
                display: 'flex',
                justifyContent: 'space-between',
            }}>
                <div className="logo-holder" style={{ margin: 'auto'}}>
                    <Link to="/">
                        <img style={{ height: 'auto',marginLeft: 'auto', marginRight: 'auto', width: '130px', marginTop: '-0.5rem' }} src="images/logo.jpg" alt="" />
                    </Link>
                </div>
                <div className="show-search-button"><i className="fa fa-search"></i> <span>Search</span></div>
                <div className="show-reg-form modal-open"><i className="fa fa-sign-in"></i>Sign In</div>
            </div>
        </header>
    );
}