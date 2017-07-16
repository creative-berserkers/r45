import AppContainer from '../view/AppContainer'
import rootReducer from '../model'
import {commandMiddleware} from './client-io'
import {createStore, applyMiddleware, compose} from 'redux'
import {Provider} from 'react-redux'
import * as ReactDOM from 'react-dom'
import * as React from 'react'
import '../assets/css/bootstrap.min.css'
import '../assets/css/bootstrap-theme.min.css'
import '../assets/css/style.css'


const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(commandMiddleware as any)))

ReactDOM.render(
    <Provider store={store}>
      <AppContainer/>
    </Provider>
    ,document.getElementById('mount'))
