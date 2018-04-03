import { take, put, select, race, call } from 'redux-saga/effects'
import {
  BattleTypeKeys, assignDiceResponse,
  keepDicesResponse, setUnitQueryResponse,
  RollDicesRequestAction, setUnitRollsResponse, DiceSelectRequestAction, setUnitDiceRollsResponse, KeepDicesRequestAction,
} from './battle-actions'
import {
  BattleState, CardState,
  DiceRollState,
  PlayerCard, selectDiceActionWhereEqual, selectDiceWhereEqual, selectNone, UnitState} from './battle-reducer'
import {
  BattleStateSelector, unitsSelector,
} from './battle-selectors'
import {  getRandomArbitrary, mapIdMapValues } from './battle-utils'


// noinspection JSUnusedLocalSymbols
const keepDices = (stateSelector: BattleStateSelector) => function* (unitId: string) {
  yield put(keepDicesResponse(unitId))
}

export function* handleRollDices<T,R>(rollAction: RollDicesRequestAction) {
  const { meta: { unitId } } = rollAction
  const unit: UnitState = yield select<BattleState>(state => unitsSelector(state)[unitId])
  if (unit.rolls >= 1) {
    const newUnassignedDices = mapIdMapValues<DiceRollState, DiceRollState>(unit.diceRolls, d => ({ ...d, rollResult: getRandomArbitrary(1, 7) }))
    yield put(setUnitDiceRollsResponse(unit.id, newUnassignedDices))
    yield put(setUnitRollsResponse(unit.id, unit.rolls - 1))
    yield put(setUnitQueryResponse(unit.id, unit.rolls === 1 ? [
      selectDiceWhereEqual('canBeAssignedToCard', true),
      selectDiceActionWhereEqual('id', 'keep'),
    ] : [
      selectDiceWhereEqual('canBeAssignedToCard', true),
      selectDiceActionWhereEqual('id', 'roll'),
      selectDiceActionWhereEqual('id', 'keep'),
    ]))
  }
}

export function* handleKeepDices<T,R>(keepAction: KeepDicesRequestAction) {
  const { meta: { unitId } } = keepAction
  const unit: UnitState = yield select<BattleState>(state => unitsSelector(state)[unitId])

  yield put(setUnitRollsResponse(unit.id, 0))
  yield put(setUnitQueryResponse(unit.id, [
    selectNone(),
  ]))
}

export function* handleSelectDices<T,R>(diceSelectAction: DiceSelectRequestAction) {
  const { meta: { unitId }, payload: diceRollId } = diceSelectAction
  const unit: UnitState = yield select<BattleState>(state => unitsSelector(state)[unitId])
  const cards: CardState[] = yield select<BattleState>(state => unit.assignedCardsIds.map(c => state.cards[c]))
  const diceRoll = unit.diceRolls[diceRollId]

  const foundCard = cards.find(card => card.require === diceRoll.rollResult && diceRoll.type === PlayerCard.UNASSIGNED)

  if (foundCard) {
    put(assignDiceResponse(unitId, foundCard.id, diceRollId))
  }
}

export function* handleDiceRolling() {

  while (true) {
    const { rollDicesRequest, keepDicesRequest, diceSelectRequest } = yield race({
      rollDicesRequest: take(BattleTypeKeys.ROLL_DICES_REQUEST),
      keepDicesRequest: take(BattleTypeKeys.KEEP_DICES_REQUEST),
      diceSelectRequest: take(BattleTypeKeys.DICE_SELECT_REQUEST),
    })

    let unitId: string

    if (rollDicesRequest) {
      unitId = rollDicesRequest.meta.unitId
      yield call(handleRollDices,rollDicesRequest)
    }
    if (keepDicesRequest) {
      unitId = keepDicesRequest.meta.unitId
      yield call(handleKeepDices, keepDicesRequest)
    }
    if (diceSelectRequest) {
      unitId = diceSelectRequest.meta.unitId
      yield call(handleSelectDices, diceSelectRequest)
    }

    const unit = yield select<BattleState>(state => unitsSelector(state)[unitId])

    if (unit.rolls === 0) return
  }
}

export function* handleCardsPlaying() {
  return 0
}

export default function* battleSaga() {
  yield call(handleDiceRolling)
  yield call(handleCardsPlaying)
}
