import {take, call, put, takeEvery, takeLatest, select} from 'redux-saga/effects'
import {
    playerQueryRequest,
    BattleTypeKeys, RollDicesRequestAction, rollDicesResult
} from './battle-actions'
import {BattleState, DiceState,PlayerQuery} from './battle-reducer'
import {UIDice, unitDicesSelector} from './battle-selectors'
import {getRandomArbitrary} from "./battle-utils";


function* makePlayerQuery(query:PlayerQuery){
    yield put(playerQueryRequest(query))
    return yield take(BattleTypeKeys.PLAYER_QUERY_RESPONSE)
}

/*function* selectGroup(){
    yield put(selectGroupRequest())
    const selectedGroup = yield take(TypeKeys.SELECT_GROUP_RESPONSE)
    return selectedGroup
}

function* healSaga(){
    return undefined
}

function* maneuverSaga(){
    const controlledUnit:UnitState = yield select(getControlledUnit)
    const unitGroup:GroupState = yield select(getUnitGroup, controlledUnit.id)

    yield put(selectGroupRequest({from:unitGroup, range:1})
    const selectedGroup = yield take(TypeKeys.SELECT_GROUP_RESPONSE)

    yield put(moveUnitToGroup(controlledUnit.id, selectedGroup.id)

    return undefined
}

export interface CardToSagaMap {
    [key:string]: Iterable<void>
}

const cardToSagaMap:CardToSagaMap = {
    //'heal' : healSaga,
    //'maneuver': maneuverSaga,
}*/

const rollDices = (stateSelector: (state:any)=>BattleState) => function* (rollDicesRequest:RollDicesRequestAction){
    const unitId = rollDicesRequest.unitId
    const dices:UIDice[] = yield select((state:any) => unitDicesSelector(stateSelector(state), {activeUnitId: unitId}), unitId)

    const newDices:DiceState[] = dices.map(dice =>
        dice.isSelected ? dice : {...dice, face: getRandomArbitrary(1, 7)}
    ).sort((a, b) => a.face - b.face)

    yield put(rollDicesResult(newDices))
}

export default (stateSelector:(state:any) => BattleState) => function* battleSaga() {
    yield takeEvery(BattleTypeKeys.ROLL_DICES_REQUEST, rollDices(stateSelector));

    /*const playerIdAssignedAction:PlayerIdAssignedAction = yield take(BattleTypeKeys.PLAYER_ID_ASSIGNED)
    const playerId = playerIdAssignedAction.playerId
    while (true) {
        const controlledUnits:UnitState[] = yield select(getControlledUnits, playerId)
        const activeUnit = yield* makePlayerQuery({
            from: 'unit',
            where: [{
                type: 'one-of',
                prop: 'id',
                value: controlledUnits.map(unit => unit.id)
            }]
        })


        //const cardPlayAction:CardPlayAction = yield take(TypeKeys.CARD_PLAY)
        //console.log('intercepted', cardPlayAction)
        //yield* cardToSagaMap[cardPlayAction.cardId]()
    }*/
}