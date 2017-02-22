/*global __REDUX_DEVTOOLS_EXTENSION_COMPOSE__ */

import AppContainer from '../view/AppContainer'
import contextReducer from '../model/client-reducer'
import commandMiddleware from './client-io'
import {createStore, applyMiddleware, compose} from 'redux'
import {Provider} from 'react-redux'
import * as ReactDOM from 'react-dom'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(contextReducer, composeEnhancers(applyMiddleware(commandMiddleware)))

ReactDOM.render(
    <Provider store={store}>
      <AppContainer></AppContainer>
    </Provider>
    ,document.getElementById('mount'))
