import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Unknown from './components/Unknown.js';

const Routes = () => {
    return (
        <Switch>
            <Route path='/' exact component={Home} />
            <Route exact component={Unknown} />
        </Switch>
    );
};

export default Routes;