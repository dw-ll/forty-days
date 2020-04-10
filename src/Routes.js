import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AppliedRoute from './components/AppliedRoute';
import Home from './containers/Home';
import Login from './containers/Login';
import Unknown from './containers/Unknown';

export default function Routes({ appProps }) {
    return (
        <Switch>
            <AppliedRoute path='/' exact component={Home} appProps={appProps} />
            <AppliedRoute path='/login' exact component={Login} appProps={appProps} />
            <Route exact component={Unknown} />
        </Switch>
    );
};