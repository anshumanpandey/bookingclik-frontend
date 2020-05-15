
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LoginPage } from '../pages/brokerLogin/Login';
import { Popover, Popper, Fade, Paper } from '@material-ui/core';

export const Header = () => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const headerRef = React.useRef<Element | null>(null);

    let ulStyle: React.CSSProperties = {}

    if (showModal) {
        ulStyle = {
            opacity: 1,
            visibility: 'visible',
            margin: 0,
            left: '-12vw',
            right: '-2vw',
            padding: 0,
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
        }
    }

    return (
        <>
            <header style={{ backgroundColor: '#154a64', display: 'flex', flexDirection: 'row', padding: 0, }} className="main-header dark-header fs-header sticky">
                <div className="header-inner" style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flex: '1',
                }}>
                    <div className="logo-holder" style={{
                        top: 'unset',
                        height: 'unset',
                        marginLeft: '3rem',
                    }}>
                        <Link to="/">
                            <img style={{ height: 'auto', marginLeft: 'auto', marginRight: 'auto', width: '130px', marginTop: '-0.5rem' }} src={`${process.env.PUBLIC_URL}/images/logo.png`} alt="" />
                        </Link>
                    </div>
                </div>
                <div style={{ top: 'unset', color: 'white', margin: 0 }} className="nav-holder main-menu">
                    <nav style={{ height: '100%' }}>
                        <ul style={{ padding: 0, height: '100%' }}>
                            <li
                                style={{ height: '100%', display: 'flex', alignItems: 'center', margin: 'unset', padding: '0.5rem', color: showModal ? 'black' : 'white', backgroundColor: showModal ? 'white' : '' }}
                                className="no-hover"
                                ref={(e) => headerRef.current = e}
                                onClick={(e) => setShowModal(p => !p)}>
                                <i style={{ marginRight: '0.2rem' }} className="fas fa-sign-in-alt"></i>Sign In
                        </li>
                        </ul>
                    </nav>
                </div>
            </header>
            <Popper
                className="loginPopover"
                open={showModal}
                anchorEl={headerRef.current ? headerRef.current : undefined}
                placement={'bottom-end'} transition>
                {({ TransitionProps }) => (
                    <Paper>
                        <LoginPage />
                    </Paper>
                )}
            </Popper>
        </>
    );
}