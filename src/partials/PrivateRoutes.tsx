import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useGlobalState } from '../state';

const PrivateRoute: React.FC<{ component: React.ComponentType<any>, [x:string]: any }> = ({component: Component, ...rest}) => {
    const [ token ] = useGlobalState('token');

    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /login page
        <Route {...rest} render={props => (
            token ?
            //@ts-ignore
                <Component {...props} />
            : <Redirect to="/" />
        )} />
    );
};

export default PrivateRoute;