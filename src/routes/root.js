import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Register from '../pages/Register';
import { Context } from '../context/authContext';
import Root from './routes';

const CustomRoute = ({ isPrivate, ...rest }) => {
    if (isPrivate) {
        return <Redirect to='/login' />
    }

    return <Route {...rest} />
}

const Routes = () => (
    <Switch>
        <CustomRoute path='/' component={Root} />
    </Switch>
)

export default Routes;