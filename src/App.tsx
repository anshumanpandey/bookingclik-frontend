import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import './index.css';
import 'rc-time-picker/assets/index.css';
import { Main } from './pages/main/main';
import { ListResult } from './pages/listResults/ListResults';
import { ProfilePage } from './pages/dashboard/Dashboard';
import { Soon } from './pages/comingSoon/Soon';
import { useGlobalState } from './state';
import PrivateRoute from './partials/PrivateRoutes';
import './utils/AxiosBootstrap'

function App() {

    const [loading, setLoading] = useGlobalState('loading');
    let routes = [
        { path: '/dashboard', component: ProfilePage, private: true },
        { path: '/results', component: ListResult },
        { path: '/', component: Main }
    ]

    if (process.env.REACT_APP_SOON) {
        routes = [
            { path: '/', component: Soon }
        ]
    }

    return (
        <BrowserRouter>
            {loading && (
                <div className="loader-wrap" style={{ backgroundColor: '#154a64' }}>
                    <img style={{ position: 'absolute', left: '40%', top: '38%' }} src={`${process.env.PUBLIC_URL}images/logo.png`} />
                    <div style={{ top: '70%' }} className="pulse"></div>
                </div>
            )}
            <div id="main">

                <Switch>
                    {routes.map(r => {
                        if (r.private) {
                            return (
                                <PrivateRoute key={r.path} path={r.path} component={r.component} />
                            );
                        }
                        return (
                            <Route key={r.path} path={r.path} component={r.component} />
                        );
                    })}
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;
