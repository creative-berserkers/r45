import { take, put, takeEvery, select, race, call } from 'redux-saga/effects'
import {
  BattleTypeKeys, rollDicesResponse, assignDiceResponse,
  keepDicesResponse, UnitSelectRequestAction, damageUnitResponse,
  killUnitResponse, GroupSelectRequestAction, moveUnitToGroupResponse, BattleActionRequestTypes,
  RollDicesResult, cardPlayResponse, setUnitPhaseResponse, setUnitQueryResponse,
  setUnitGroupResponse, RequestAction, RollDicesRequestAction, setUnitRollsResponse, DiceSelectRequestAction, setUnitDiceRollsResponse, KeepDicesRequestAction,
} from './battle-actions'
import {
  BattleState, CardState,
  DiceRollState,
  PlayCardPhases, PlayerCard, PlayerQuerySelectTarget, RollingPhases, selectDiceActionWhereEqual, selectDiceWhereEqual, selectNone, StateMap,
  UnitState, WhereClauseOperator, WhereClauseType,
} from './battle-reducer'
import {
  unitSelector, diceToCardAssignmentsSelector, BattleStateSelector, Unit, Group, unitGroupSelector,
  ActiveUnitCard, activeUnitCardsSelector, createUnitSelector, unitsSelector,
} from './battle-selectors'
import { findIdMapValue, getRandomArbitrary, mapIdMapValues, mapValues } from './battle-utils'
import { getBattleState, RootState } from '../main/root-reducer'
import { Selector } from "reselect";

const rollDices = (stateSelector: BattleStateSelector) => function* (unitId: string) {
  const unit: UnitState = yield select((state: any) => unitSelector(stateSelector(state), { unitId }))
  if (unit.rolls >= 1) {
    const diceToCardAssignmentsMap = yield select((state: any) => stateSelector(state).diceToCardAssignments)

    const unitAssignments = mapValues<DiceToCardAssignment>(diceToCardAssignmentsMap)
      .filter(dtca => dtca.unitId === unit.id)

    const rollDicesResult: RollDicesResult = unitAssignments.reduce((acc: RollDicesResult, assignment) => {
      acc[assignment.id] = assignment.cardId === 'unassigned' ? getRandomArbitrary(1, 7) : assignment.rollResult
      return acc
    }, {})

    yield put(rollDicesResponse(unitId, rollDicesResult))
  }
}

// noinspection JSUnusedLocalSymbols
const keepDices = (stateSelector: BattleStateSelector) => function* (unitId: string) {
  yield put(keepDicesResponse(unitId))
}

const assignDice = (stateSelector: BattleStateSelector) => function* (unitId: string, assignmentId: string) {
  const diceToCardAssignments: StateMap<DiceToCardAssignment> = yield select((state: any) => diceToCardAssignmentsSelector(stateSelector(state)))
  const selectedDiceToCardAssignment = findIdMapValue(diceToCardAssignments, diceToCardAssignment => diceToCardAssignment.id === assignmentId)
  if (!selectedDiceToCardAssignment) return

  if (selectedDiceToCardAssignment.cardId === 'unassigned') {
    const cards: ActiveUnitCard[] = yield select((state: any) => activeUnitCardsSelector(stateSelector(state), { unitId }))
    const targetCard = cards.find(card => card.require === selectedDiceToCardAssignment.rollResult && card.isActive === false)
    if (targetCard) {
      yield put(assignDiceResponse(selectedDiceToCardAssignment.id, targetCard.id))
    }
  } else {
    yield put(assignDiceResponse(selectedDiceToCardAssignment.id, PlayerCard.UNASSIGNED))
  }
}

const handleRequest = (stateSelector: BattleStateSelector) => {
  const handleRollDices = rollDices(stateSelector)
  const handleKeepDices = keepDices(stateSelector)
  const handleAssignDice = assignDice(stateSelector)

  return function* ({ meta, payload, type }: BattleActionRequestTypes) {
    const unit: UnitState = yield select((state: any) => unitSelector(stateSelector(state), { unitId: meta.unitId }))
    switch (unit.phase) {
      case RollingPhases.ROLLING: {
        if (type === BattleTypeKeys.ROLL_DICES_REQUEST) {
          yield* handleRollDices(meta.unitId)
        }
      }
        break
      case RollingPhases.REROLLING: {
        if (type === BattleTypeKeys.ROLL_DICES_REQUEST) {
          yield* handleRollDices(meta.unitId)
        }
        if (type === BattleTypeKeys.KEEP_DICES_REQUEST) {
          yield* handleKeepDices(meta.unitId)
        }
        if (type === BattleTypeKeys.DICE_SELECT_REQUEST && payload) {
          yield* handleAssignDice(meta.unitId, payload)
        }
      }
        break
      case RollingPhases.WAITING_FOR_OTHERS:
        break
      case RollingPhases.PLAYING_CARDS: {
        if (type === BattleTypeKeys.CARD_PLAY_REQUEST) {
          switch (payload) {
            case PlayerCard.TELEPORT : {
              yield put(cardPlayResponse(meta.unitId, PlayerCard.TELEPORT, PlayCardPhases.PLAY_TELEPORT, PlayerQuerySelectTarget.GROUP))
            }
              break
            case PlayerCard.FIREBALL : {
              yield put(cardPlayResponse(meta.unitId, PlayerCard.FIREBALL, PlayCardPhases.PLAY_FIREBALL, PlayerQuerySelectTarget.UNIT))
            }
          }
        }
      }
        break
      case PlayCardPhases.PLAY_TELEPORT: {
        if (type === BattleTypeKeys.GROUP_SELECT_REQUEST) {
          const diceToCardAssignments: StateMap<DiceToCardAssignment> = yield select((state: any) => diceToCardAssignmentsSelector(stateSelector(state)))
          const sourceCardAssignment = findIdMapValue(diceToCardAssignments, dtca => dtca.unitId === meta.unitId && dtca.cardId === PlayerCard.TELEPORT)
          if (sourceCardAssignment && payload) {
            yield put(setUnitGroupResponse(meta.unitId, payload))
          }
          yield put(setUnitPhaseResponse(meta.unitId, RollingPhases.PLAYING_CARDS))
          yield put(setUnitQueryResponse(meta.unitId, [{
            select: PlayerQuerySelectTarget.CARD,
            where: [{
              type: WhereClauseType.MATCH_ALL,
              prop: 'diceId',
              operator: WhereClauseOperator.NOT_EQUAL,
              value: 'none',
            },
              {
                type: WhereClauseType.MATCH_ALL,
                prop: 'canBePlayedInCurrentTurn',
                operator: WhereClauseOperator.EQUAL,
                value: true,
              }],
          }]))
        }
      }
        break
      case PlayCardPhases.PLAY_FIREBALL: {
        if (type === BattleTypeKeys.UNIT_SELECT_REQUEST && payload) {
          const dmgAmount = 6
          const unit: Unit = yield select((state: any) => unitSelector(stateSelector(state), { unitId: payload }))

          if (unit.health > dmgAmount) {
            yield put(damageUnitResponse(payload, dmgAmount))
          } else {
            yield put(killUnitResponse(payload))
          }
          yield put(setUnitPhaseResponse(meta.unitId, RollingPhases.PLAYING_CARDS))
          yield put(setUnitQueryResponse(meta.unitId, [{
            select: PlayerQuerySelectTarget.CARD,
            where: [{
              type: WhereClauseType.MATCH_ALL,
              prop: 'diceId',
              operator: WhereClauseOperator.NOT_EQUAL,
              value: 'none',
            },
              {
                type: WhereClauseType.MATCH_ALL,
                prop: 'canBePlayedInCurrentTurn',
                operator: WhereClauseOperator.EQUAL,
                value: true,
              }],
          }]))
        }
      }
    }

  }
}

const checkState = (stateSelector: BattleStateSelector) => function* () {
  const allPlayersPlaying = yield select((state: any) => Object.keys(stateSelector(state).units).every(
    unitId => stateSelector(state).units[unitId].phase === 'playing-cards'))

  /*if(allPlayersPlaying){
      console.log('all players playing')
      while(true) {
          const cardPlayAction:CardPlayRequestAction = yield take(BattleTypeKeys.CARD_PLAY_REQUEST)
          console.log(`playing ${cardPlayAction.cardId}`)
          switch(cardPlayAction.cardId){
              case 'fireball':{
                  yield playFireball(stateSelector,cardPlayAction.unitId)
                  break
              }
              case 'maneuver':{
                  yield playManeuver(stateSelector,cardPlayAction.unitId)
                  break
              }
              default: console.log(`${cardPlayAction.cardId} not found`)
          }
      }

  } else {
      console.log('Not yet...')
  }*/
}

function* playFireball(stateSelector: BattleStateSelector, unitId: string) {
  const dmgAmount = 6
  /*yield put(playerQueryResponse(unitId,[{
      select: 'unit'
  }]))*/
  const { payload }:UnitSelectRequestAction = yield take(BattleTypeKeys.UNIT_SELECT_REQUEST)
  const unit: Unit = yield select((state: any) => unitSelector(stateSelector(state), { unitId: payload }))

  if (unit.health > dmgAmount) {
    yield put(damageUnitResponse(payload, 6))
  } else {
    yield put(killUnitResponse(payload))
  }
}

function* playManeuver(stateSelector: BattleStateSelector, unitId: string) {
  /*yield put(playerQueryResponse(unitId,[{
      select: 'group'
  }]))*/
  const { payload: targetGroupId }:GroupSelectRequestAction = yield take(BattleTypeKeys.GROUP_SELECT_REQUEST)
  const currentGroup: Group = yield select((state: any) => unitGroupSelector(stateSelector(state), { unitId }))

  yield put(moveUnitToGroupResponse(unitId, targetGroupId))
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
  const cards: CardState[] = yield select<BattleState>(state => unit.assignedCardsIds.map(c => state.assignedCardsIds[c]))
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
