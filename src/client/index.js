/*global __REDUX_DEVTOOLS_EXTENSION_COMPOSE__ */

import AppContainer from '../view/AppContainer'
import rootReducer from '../model'
import commandMiddleware from './client-io'
import {createStore, applyMiddleware, compose} from 'redux'
import {Provider} from 'react-redux'
import * as ReactDOM from 'react-dom'
import * as React from 'react'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(commandMiddleware)))

ReactDOM.render(
    <Provider store={store}>
      <AppContainer/>
    </Provider>
    ,document.getElementById('mount'))
