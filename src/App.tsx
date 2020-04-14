import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import './index.css';
import './utils/AxiosConfig';
import { Main } from './pages/main/main';
import { ListResult } from './pages/listResults/ListResults';
import { Soon } from './pages/comingSoon/Soon';

function App() {
    let routes = [
        { path: '/', component: <Soon /> }
    ]

    if (process.env.NODE_ENV === "development") {
        routes = [
            { path: '/results', component: <ListResult /> },
            { path: '/', component: <Main /> }
        ]
    }
    return (
        <BrowserRouter>
            <div className="loader-wrap">
                <div className="pin"></div>
                <div className="pulse"></div>
            </div>
            <div id="main">

                <Switch>
                    {routes.map(r => {
                        return (
                            <Route path={r.path}>
                                {r.component}
                            </Route>
                        );
                    })}
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;
