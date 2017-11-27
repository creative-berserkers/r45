import {take, call, put, takeEvery, takeLatest, select} from 'redux-saga/effects'
import {
    playerQueryRequest,
    BattleTypeKeys, RollDicesRequestAction, rollDicesResponse, AssignDiceRequestAction, assignDiceResponse,
    KeepDicesRequestAction, keepDicesResponse, CardPlayRequestAction, UnitSelectRequestAction, directDamageResponse
} from './battle-actions'
import {BattleState, CardState, DiceState, DiceToCardAssignment, PlayerQuery, UnitState} from './battle-reducer'
import {
    activeUnitSelector, cardsSelector, dicesSelector, diceToCardAssignmentsSelector, ActiveUnitDice,
    unitDicesSelector, BattleStateSelector
} from './battle-selectors'
import {getRandomArbitrary} from "./battle-utils";
import {Action} from "redux"


const rollDices = (stateSelector:BattleStateSelector) => function* (rollDicesRequest:RollDicesRequestAction){
    const unitId = rollDicesRequest.unitId
    const unit:UnitState = yield select((state:any) => activeUnitSelector(stateSelector(state),{activeUnitId: unitId}))
    if(unit.rolls >= 1) {
        const dices: ActiveUnitDice[] = yield select((state: any) => unitDicesSelector(stateSelector(state), {activeUnitId: unitId}), unitId)

        const newDices: DiceState[] = dices.map(dice =>({
            id: dice.id,
            face: dice.isSelected ?  dice.face : getRandomArbitrary(1, 7)
        })
        ).sort((a, b) => a.face - b.face)

        yield put(rollDicesResponse(unitId, newDices))
    }
}

const keepDices = (stateSelector:BattleStateSelector) => function* (keepDicesRequestAction:KeepDicesRequestAction){
    const unitId = keepDicesRequestAction.unitId
    const unit:UnitState = yield select((state:any) => activeUnitSelector(stateSelector(state),{activeUnitId: unitId}))

    if(unit.phase === 'rolling'){
        yield put(keepDicesResponse(unitId))
    }
}

const assignDice = (stateSelector:BattleStateSelector) => function* (assignDiceRequestAction:AssignDiceRequestAction) {
    const unitId = assignDiceRequestAction.unitId
    const unit: UnitState = yield select((state: any) => activeUnitSelector(stateSelector(state), {activeUnitId: unitId}))
    const unitDices: ActiveUnitDice[] = yield select((state: any) => unitDicesSelector(stateSelector(state), {activeUnitId: unitId}))
    const diceToCardAssignments:DiceToCardAssignment[] = yield select((state:any) => diceToCardAssignmentsSelector(stateSelector(state), {activeUnitId:unitId}))
    const cards:CardState[] = yield select((state:any) => cardsSelector(stateSelector(state), {activeUnitId:unitId}))
    const dices:DiceState[] = yield select((state:any) => dicesSelector(stateSelector(state), {activeUnitId:unitId}))
    const selectedDice = dices.find(d => d.id === assignDiceRequestAction.diceId)

    if(!selectedDice) return

    const matchingAssignment = diceToCardAssignments.filter(assignment => assignment.diceId === assignDiceRequestAction.diceId)[0]

    if (matchingAssignment) {
        yield put(assignDiceResponse(unitId, selectedDice.id, 'none'))
    } else {
        const matchingCard = cards
            .filter(card => card.require === selectedDice.face)
            .filter(card => diceToCardAssignments.filter(assignment => assignment.cardId === card.id))[0]

        if (matchingCard) {
            yield put(assignDiceResponse(unitId, selectedDice.id, matchingCard.id))
        } else {
            yield put(assignDiceResponse(unitId, selectedDice.id, 'none'))
        }
    }
}

const checkState = (stateSelector:BattleStateSelector) => function* () {
    const allPlayersPlaying = yield select((state:any) => stateSelector(state).units.every(unit => unit.phase === 'playing-cards'))

    if(allPlayersPlaying){
        console.log('all players playing')
        while(true) {
            yield put(playerQueryRequest({
                select: 'card',
                where: {
                    type: 'match',
                    prop: 'diceId',
                    operator: '!=',
                    value: 'none'
                }
            }))
            const cardPlayAction:CardPlayRequestAction = yield take(BattleTypeKeys.CARD_PLAY_REQUEST)
            console.log(`playing ${cardPlayAction.cardId}`)
            switch(cardPlayAction.cardId){
                case 'fireball':{
                    yield playFireball(stateSelector,cardPlayAction.unitId)
                    break
                }
                default: console.log(`${cardPlayAction.cardId} not found`)
            }
        }

    } else {
        console.log('Not yet...')
    }
}

function* playFireball(stateSelector:BattleStateSelector, unitId:string) {
    yield put(playerQueryRequest({
        select: 'unit'
    }))
    const {targetUnitId}:UnitSelectRequestAction = yield take(BattleTypeKeys.UNIT_SELECT_REQUEST)
    yield put(directDamageResponse(targetUnitId,6))
    console.log('shooting fireball at', targetUnitId)
}

export default (stateSelector:BattleStateSelector) => function* battleSaga() {
    yield takeEvery(BattleTypeKeys.ROLL_DICES_REQUEST, rollDices(stateSelector))
    yield takeEvery(BattleTypeKeys.KEEP_DICES_REQUEST, keepDices(stateSelector))
    yield takeEvery(BattleTypeKeys.ASSIGN_DICE_REQUEST, assignDice(stateSelector))

    const check = checkState(stateSelector)

    while (true) {
        yield take('*')
        yield check()
    }
}