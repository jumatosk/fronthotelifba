import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Register from '../pages/Register';
import Login from '../pages/Login';
import Home from '../pages/Home';

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Home} />
                <Route path='/login' component={Login} />
                <Route path='/cadastro' component={Register} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;