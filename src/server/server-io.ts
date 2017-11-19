import * as fs from 'fs'
import * as path from 'path'
import serverMiddleware from './middleware/server-middleware'
import responseMiddleware from './middleware/response-middleware'
import log from './log'
import {createStore, applyMiddleware} from 'redux'
//import {contextDespawnedAction, contextSpawnedAction, contextAction} from '../model/all-contexts-reducer';
//import rootReducer from '../model'
import Socket = SocketIO.Socket;
//import {loadStateAction} from '../model/index'

const pwd = process.env.PWD || process.cwd()

const dataDirPath = path.join(pwd, 'data')
const stateFilePath = path.join(pwd, 'data/state.json')

const clientSocketIdToGuid: {
    [key: string]: string | undefined
} = {}
const clientGuidToSocket: {
    [key: string]: Socket | undefined
} = {}

let controllerSocket: Socket;

if (!fs.existsSync(dataDirPath)) {
    fs.mkdirSync(dataDirPath)
}
let stateStr = '{}'
try {
    stateStr = fs.readFileSync(stateFilePath, 'utf8')
} catch (e) {
    fs.writeFileSync(stateFilePath, '{}', {flag: 'wx'})
}

if (stateStr.trim().length === 0) stateStr = '{}'
const store = createStore(()=>{}, JSON.parse(stateStr), applyMiddleware(serverMiddleware, responseMiddleware.bind(undefined, clientGuidToSocket, () => controllerSocket)))

store.subscribe(function persistState() {
    const currentState = store.getState()
    if (currentState === undefined) {
        log.warn('Saving empty state.')
    } else {
        try {
            fs.writeFileSync(stateFilePath, JSON.stringify(currentState, null, 2))
            log.info('State Saved to', stateFilePath)
        } catch (e) {
            log.error('Error while saving state', e.message)
        }
    }
})

export default function onSocket(socket: Socket) {
    const ipAddress = socket.request.connection.remoteAddress
    const clientId = `${ipAddress}`
    log.info(`client ??@${clientId} connected`)

    socket.on('authentication', function (guid:string) {
        clientSocketIdToGuid[socket.id] = guid
        clientGuidToSocket[guid] = socket
        log.info(`client ??@${clientId} authenticated as ${guid}`)
        socket.emit('state_sync', store.getState());
        //store.dispatch(contextSpawnedAction(guid))
    })

    socket.on('disconnect', function () {
        const guid = clientSocketIdToGuid[socket.id]
        log.info(`client ${guid}@${clientId} disconnected`)
        //store.dispatch(contextDespawnedAction(guid))
        if(guid === undefined) return
        clientGuidToSocket[guid] = undefined
        clientSocketIdToGuid[socket.id] = undefined
    })

    socket.on('command_request', function (action) {
        const guid = clientSocketIdToGuid[socket.id]
        log.info(`client ${guid}@${clientId} action: ${JSON.stringify(action)}`)
        //store.dispatch(contextAction(guid, action))
    })

    socket.on('controller-connect', () => {
        controllerSocket = socket;
        controllerSocket.emit('state-sync', store.getState())
    })
}
