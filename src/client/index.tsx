import * as injectTapEventPlugin from 'react-tap-event-plugin'
import { Provider } from 'react-redux'
import * as React from 'react'
import { render } from 'react-dom'
import rootReducer from '../model'
import { commandMiddleware } from './client-io'
import { createStore, applyMiddleware, compose } from 'redux'

injectTapEventPlugin()

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(commandMiddleware as any)))

const renderApp = () => {

    const Component = require('../view/Game').default
    render(
        <Provider store={store}>
            <Component/>
        </Provider>
        , document.getElementById('mount'))
}

renderApp()

const rootElement = document.getElementById('mount')

if ((module as any).hot) {

    const renderError = (error:any) => {
        const RedBox = require('redbox-react');
        render(
            <RedBox error={error} />,
            rootElement,
        );
    };

    const renderAll = () => {
        try {
            renderApp();
        }
        catch (error) {
            renderError(error);
        }
    };
    (module as any).hot.accept('../view/Game',renderAll)
}
