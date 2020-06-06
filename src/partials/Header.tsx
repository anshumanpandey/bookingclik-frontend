
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGlobalState, dispatchGlobalState } from '../state';
import { useMediaQuery } from 'react-responsive'

export const Header = () => {
    const [token] = useGlobalState('token');
    const [showModal, setShowModal] = useState<boolean>(false);
    const headerRef = React.useRef<Element | null>(null);
    const isSm = useMediaQuery({ query: '(min-width: 768px)' })

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
                        marginLeft: isSm ? 'unset':'1rem',
                        margin: isSm ? '1rem' : 'auto',
                    }}>
                        <Link to="/">
                            <img style={{ height: 'auto', marginLeft: 'auto', marginRight: 'auto', width: '130px', marginTop: '-0.5rem' }} src={`${process.env.PUBLIC_URL}/images/logo.png`} alt="" />
                        </Link>
                    </div>
                </div>
                <div style={{ top: 'unset', color: 'white', margin: 0 }} className="nav-holder main-menu">
                    <nav style={{ height: '100%' }}>
                        <ul style={{ padding: 0, height: '100%' }}>
                            {!token ?(
                                <li
                                style={{ cursor: 'pointer',height: '100%', display: 'flex', alignItems: 'center', margin: 'unset', padding: '0.5rem', color: showModal ? 'black' : 'white', backgroundColor: showModal ? 'white' : '' }}
                                className="no-hover"
                                ref={(e) => headerRef.current = e}
                                onClick={(e) => {
                                    Object.assign(document.createElement('a'), {
                                        target: '_blank',
                                        href: `https://www.bookingclik.com/`,
                                      }).click();
                                }}>
                                <i style={{ marginRight: '0.2rem' }} className="fas fa-sign-in-alt"></i>Sign In
                        </li>
                            ): 
                            <li
                                style={{ cursor: 'pointer',height: '100%', display: 'flex', alignItems: 'center', margin: 'unset', padding: '0.5rem', color: showModal ? 'black' : 'white', backgroundColor: showModal ? 'white' : '' }}
                                className="no-hover"
                                ref={(e) => headerRef.current = e}
                                onClick={(e) => dispatchGlobalState({ type: 'logout' })}>
                                <i style={{ marginRight: '0.2rem' }} className="fas fa-sign-out-alt"></i>Log out
                        </li>
                            }
                        </ul>
                    </nav>
                </div>
            </header>
        </>
    );
}