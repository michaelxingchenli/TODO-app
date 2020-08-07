import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Redirect, Router, Route } from 'react-router-dom';

import { store } from '../store';
import { history } from '../store/history';
import { ConnectedDashboard } from './Dashboard';
import { ConnectedNavigation } from './Navigation';
import { ConnectedTaskDetail } from './TaskDetail';
import { ConnectedLogin } from './Login'

const RouteGuard = Component => ({match}) => {
    console.info("Route Guard ", match);
    if (!store.getState().session.authenticated) {
        return <Redirect to="/" />
    } else {
        return <Component match = {match} />
    }
}

export const Main = () => (
    <Router history={history}>
        <Provider store={store}>
            <div>
                < ConnectedNavigation />
                {/*<ConnectedDashboard />*/}
                <Route 
                    exact 
                    path="/dashboard" 
                    render={RouteGuard(ConnectedDashboard)}
                />
                <Route
                    exact
                    path="/task/:id"
                    render={RouteGuard(ConnectedTaskDetail) }
                />
                <Route
                    exact
                    path="/"
                    component={ConnectedLogin}
                />
            </div>
        </Provider>
    </Router>
)

