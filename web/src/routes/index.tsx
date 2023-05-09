import React from 'react'
import {  Switch } from 'react-router-dom'

import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'
import Dashboard from '../pages/Dashboard'
import Route from './Router'
import { ListOrder } from '../pages/ListOrder'
import {ListOneOrder} from '../pages/ListOneOrder'

export function Routers() {
    return (
        <Switch>
            <Route path='/' exact component={SignIn} />
            <Route path='/signup'  component={SignUp } isPrivate />
            <Route path='/dashboard' component={Dashboard} isPrivate />
            <Route path='/listOrder' component={ListOrder} isPrivate />
            <Route path='/listOneOrder' component={ListOneOrder} />
        </Switch>
    )
}


