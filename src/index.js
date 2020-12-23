import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'

import store from './redux/store'
import Register from './containers/register/Register.jsx'
import Login from './containers/login/Login.jsx'
import Main from './containers/main/Main.jsx'
import './assets/css/index.less'

ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            <Switch>
                <Route path='/register' component={Register}></Route>
                <Route path='/login' component={Login}></Route>
                <Route component={Main}></Route>
            </Switch>
        </HashRouter>
    </Provider>,
    document.getElementById('root')
)