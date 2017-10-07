import * as injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Provider } from 'react-redux'
import * as ReactDOM from 'react-dom'
import * as React from 'react'
import rootReducer from '../model'
import { commandMiddleware } from './client-io'
import { createStore, applyMiddleware, compose } from 'redux'

injectTapEventPlugin()

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(commandMiddleware as any)))

const render = () => {
  import('../view/Game').then(({default: Component}) => {
    ReactDOM.render(
        <Provider store={store}>
          <MuiThemeProvider>
          <Component/>
          </MuiThemeProvider>
        </Provider>

        , document.getElementById('mount'))
  })
}

render()

if ((module as any).hot) {
  (module as any).hot.accept(render)
}
