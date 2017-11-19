import * as injectTapEventPlugin from 'react-tap-event-plugin'
import { Provider } from 'react-redux'
import * as React from 'react'
import { render } from 'react-dom'
import createSagaMiddleware from 'redux-saga'
import {battleReducer, BattleState, battleViewReducer, BattleViewState} from '../ui/battle/battle-reducer'
import rootSaga from '../ui/battle/battle-saga'
//import { commandMiddleware } from './client-io'
import {createStore, applyMiddleware, compose, combineReducers, Reducer} from 'redux'

injectTapEventPlugin()

export interface RootState {
    battle: BattleState,
    battleView: BattleViewState
}

const rootReducer:Reducer<RootState> = combineReducers({
    battle: battleReducer,
    battleView: battleViewReducer
})

const sagaMiddleware = createSagaMiddleware()
//const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(rootSaga((state) => state.battle))

const renderApp = () => {

    const Component = require('../ui/battle/BattleView').default
    render(
        <Provider store={store}>
            <Component
                battleStateSelector={(state:RootState) => state.battle}
                battleViewStateSelector={(state:RootState) => state.battleView}
            />
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
    (module as any).hot.accept('../ui/battle/BattleView',renderAll)
}
