
import React from 'react';
import { Link } from 'react-router-dom';

export const Header = () => {

    return (
        <header style={{ backgroundColor: '#154a64', display: 'flex', flexDirection: 'column' }} className="main-header dark-header fs-header sticky">
            <div className="header-inner" style={{ 
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flex: '1',
            }}>
                <div className="logo-holder" style={{
                    top: 'unset',
                    height: 'unset'
                }}>
                    <Link to="/">
                        <img style={{ height: 'auto',marginLeft: 'auto', marginRight: 'auto', width: '130px', marginTop: '-0.5rem' }} src={`${process.env.PUBLIC_URL}/images/logo.png`} alt="" />
                    </Link>
                </div>
                <div className="show-search-button"><i className="fa fa-search"></i> <span>Search</span></div>
                <div style={{ position: 'unset' }} className="show-reg-form modal-open"><i className="fa fa-sign-in"></i>Sign In</div>
            </div>
        </header>
    );
}