import { call, put, take } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'

const wsUrl = 'localhost:8090'

function initWebsocket() {
  return eventChannel((emitter) => {
    const ws = new WebSocket(wsUrl + '/client')
    ws.onopen = () => {
      console.log('opening...')
      ws.send('hello server')
    }
    ws.onerror = (error) => {
      console.log('WebSocket error ' + error)
      console.dir(error)
    }
    ws.onmessage = (e) => {
      let msg = null
      try {
        msg = JSON.parse(e.data)
      } catch (e) {
        console.error(`Error parsing : ${e.data}`)
      }
      if (msg) {
        const { payload: action } = msg
        return emitter(action)
      }
    }
    // unsubscribe function
    return () => {
      console.log('Socket off')
    }
  })
}

export default function* rootSaga() {
  const channel = yield call(initWebsocket)
  while (true) {
    const action = yield take(channel)
    yield put(action)
  }
}
