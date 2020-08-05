import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { store } from '../store';
import { ConnectedDashboard } from './Dashboard';
import { Redirect, Router, Route } from 'react-router-dom';
import { history } from '../store/history';
import { ConnectedNavigation } from './Navigation';
import { ConnectTaskDetail } from './TaskDetail';
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
                    render={RouteGuard(ConnectTaskDetail) }
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

