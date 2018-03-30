import * as injectTapEventPlugin from 'react-tap-event-plugin'
import { Provider } from 'react-redux'
import * as React from 'react'
import { render } from 'react-dom'
import createSagaMiddleware from 'redux-saga'
import battleSaga from '../ui/battle/battle-saga'
import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer, { RootState } from '../ui/main/root-reducer'

injectTapEventPlugin()


const sagaMiddleware = createSagaMiddleware()
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)))

sagaMiddleware.run(battleSaga)

const renderApp = () => {

  const Component = require('../ui/battle/BattleView').default
  render(
    <Provider store={store}>
      <Component
        battleStateSelector={(state: RootState) => state.battle}
        battleViewStateSelector={(state: RootState) => state.battleView}
      />
    </Provider>
    , document.getElementById('mount'))
}

renderApp()

const rootElement = document.getElementById('mount')

if ((module as any).hot) {

  const renderError = (error: any) => {
    const RedBox = require('redbox-react')
    render(
      <RedBox error={error}/>,
      rootElement,
    )
  }

  const renderAll = () => {
    try {
      renderApp()
    } catch (error) {
      renderError(error)
    }
  }
  (module as any).hot.accept('../ui/battle/BattleView', renderAll)
}
