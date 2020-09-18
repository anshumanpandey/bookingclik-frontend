import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import CookieConsent from "react-cookie-consent";
import './index.css';
import 'rc-time-picker/assets/index.css';
import { Main } from './pages/main/main';
import { ListResult } from './pages/listResults/ListResults';
import { AboutUs } from './pages/aboutUs/main';
import { ContactUs } from './pages/contactUs/main';
import { Soon } from './pages/comingSoon/Soon';
import { useGlobalState } from './state';
import PrivateRoute from './partials/PrivateRoutes';
import './utils/AxiosBootstrap'
import CacheBuster from './CacheBuster';
import ResolveLogoName from './utils/ResolveLogoName';

function App() {
    const [loading, setLoading] = useGlobalState('loading');

    let routes = [
        { path: '/results', component: ListResult },
        { path: '/about-us', component: AboutUs },
        { path: '/contact-us', component: ContactUs },
        { path: '/', component: Main }
    ]

    if (process.env.REACT_APP_SOON) {
        routes = [
            { path: '/', component: Soon }
        ]
    }

    return (
        <CacheBuster>
            {({ loading, isLatestVersion, refreshCacheAndReload }: any) => {
                if (loading) return null;
                if (!loading && !isLatestVersion) {
                    // You can decide how and when you want to force reload
                    refreshCacheAndReload();
                }

                return (
                    <BrowserRouter>
                        {loading && (
                            <div className="loader-wrap" style={{ backgroundColor: '#154a64' }}>
                                <img style={{ position: 'absolute', left: '40%', top: '38%' }} src={`${process.env.PUBLIC_URL}images/${ResolveLogoName("logo.png")}`} />
                                <div style={{ top: '70%' }} className="pulse"></div>
                            </div>
                        )}
                        <div id="main">

                            <Switch>
                                {routes.map(r => {
                                    return (
                                        <Route key={r.path} path={r.path} component={r.component} />
                                    );
                                })}
                            </Switch>
                            {!process.env.REACT_APP_SOON && <CookieConsent
                                containerClasses="cookie-container"
                                buttonText="Accept Cookies"
                                buttonStyle={{ backgroundColor: "#03bfcb", color: "white", fontSize: '0.8rem', fontWeight: 'bold', height: '2.5rem' }}
                            >This website uses cookies to enhance the user experience.</CookieConsent>}
                        </div>
                    </BrowserRouter>
                );
            }}
        </CacheBuster>
    );

}

export default App;
