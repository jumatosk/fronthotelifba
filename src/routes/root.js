import React from 'react';
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom';
import Register from '../pages/Register';
import Login from '../pages/Login';
import Home from '../pages/Home';

const CustomRoute = ({ isPrivate, ...rest }) => {
    if (isPrivate) {
        return <Redirect to='/login' />
    }

    return <Route {...rest} />
}

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <CustomRoute exact path='/' component={Home} />
            <CustomRoute path='/login' component={Login} />
            <CustomRoute path='/cadastro' component={Register} />
            {/* <CustomRoute isPrivate path='/' component={SignedIn} /> */}
        </Switch>
    </BrowserRouter>
)

export default Routes;