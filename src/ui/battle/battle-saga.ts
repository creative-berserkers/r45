import { take, put, takeEvery, select } from 'redux-saga/effects'
import {
  BattleTypeKeys, rollDicesResponse, assignDiceResponse,
  keepDicesResponse, UnitSelectRequestAction, damageUnitResponse,
  killUnitResponse, GroupSelectRequestAction, moveUnitToGroupResponse, RequestActionWrapper, BattleActionRequestTypes,
  RollDicesResult, cardPlayResponse, setUnitPhaseResponse, setUnitQueryResponse,
  setUnitGroupResponse,
} from './battle-actions'
import {
  DiceToCardAssignment, PlayCardPhases, PlayerCard, PlayerQuerySelectTarget, RollingPhases, StateMap,
  UnitState, WhereClauseOperator, WhereClauseType,
} from './battle-reducer'
import {
  unitSelector, diceToCardAssignmentsSelector, BattleStateSelector, Unit, Group, unitGroupSelector,
  ActiveUnitCard, activeUnitCardsSelector,
} from './battle-selectors'
import { findIdMapValue, getRandomArbitrary, mapValues } from './battle-utils'

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

  return function* ({ unitId, action }: RequestActionWrapper<BattleActionRequestTypes>) {
    const unit: UnitState = yield select((state: any) => unitSelector(stateSelector(state), { unitId }))
    switch (unit.phase) {
      case RollingPhases.ROLLING: {
        if (action.type === BattleTypeKeys.ROLL_DICES_REQUEST) {
          yield* handleRollDices(unitId)
        }
      }
        break
      case RollingPhases.REROLLING: {
        if (action.type === BattleTypeKeys.ROLL_DICES_REQUEST) {
          yield* handleRollDices(unitId)
        }
        if (action.type === BattleTypeKeys.KEEP_DICES_REQUEST) {
          yield* handleKeepDices(unitId)
        }
        if (action.type === BattleTypeKeys.DICE_SELECT_REQUEST) {
          yield* handleAssignDice(unitId, action.diceId)
        }
      }
        break
      case RollingPhases.WAITING_FOR_OTHERS:
        break
      case RollingPhases.PLAYING_CARDS: {
        if (action.type === BattleTypeKeys.CARD_PLAY_REQUEST) {
          switch (action.cardId) {
            case PlayerCard.TELEPORT : {
              yield put(cardPlayResponse(unitId, PlayerCard.TELEPORT, PlayCardPhases.PLAY_TELEPORT, PlayerQuerySelectTarget.GROUP))
            }
              break
            case PlayerCard.FIREBALL : {
              yield put(cardPlayResponse(unitId, PlayerCard.FIREBALL, PlayCardPhases.PLAY_FIREBALL, PlayerQuerySelectTarget.UNIT))
            }
          }
        }
      }
        break
      case PlayCardPhases.PLAY_TELEPORT: {
        if (action.type === BattleTypeKeys.GROUP_SELECT_REQUEST) {
          const diceToCardAssignments: StateMap<DiceToCardAssignment> = yield select((state: any) => diceToCardAssignmentsSelector(stateSelector(state)))
          const sourceCardAssignment = findIdMapValue(diceToCardAssignments, dtca => dtca.unitId === unitId && dtca.cardId === PlayerCard.TELEPORT)
          if (sourceCardAssignment) {
            yield put(setUnitGroupResponse(unitId, action.targetGroupId))
          }
          yield put(setUnitPhaseResponse(unitId, RollingPhases.PLAYING_CARDS))
          yield put(setUnitQueryResponse(unitId, [{
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
        if (action.type === BattleTypeKeys.UNIT_SELECT_REQUEST) {
          const dmgAmount = 6
          const unit: Unit = yield select((state: any) => unitSelector(stateSelector(state), { unitId: action.targetUnitId }))

          if (unit.health > dmgAmount) {
            yield put(damageUnitResponse(action.targetUnitId, dmgAmount))
          } else {
            yield put(killUnitResponse(action.targetUnitId))
          }
          yield put(setUnitPhaseResponse(unitId, RollingPhases.PLAYING_CARDS))
          yield put(setUnitQueryResponse(unitId, [{
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
  const { targetUnitId }:UnitSelectRequestAction = yield take(BattleTypeKeys.UNIT_SELECT_REQUEST)
  const unit: Unit = yield select((state: any) => unitSelector(stateSelector(state), { unitId: targetUnitId }))

  if (unit.health > dmgAmount) {
    yield put(damageUnitResponse(targetUnitId, 6))
  } else {
    yield put(killUnitResponse(targetUnitId))
  }
}

function* playManeuver(stateSelector: BattleStateSelector, unitId: string) {
  /*yield put(playerQueryResponse(unitId,[{
      select: 'group'
  }]))*/
  const { targetGroupId }:GroupSelectRequestAction = yield take(BattleTypeKeys.GROUP_SELECT_REQUEST)
  const currentGroup: Group = yield select((state: any) => unitGroupSelector(stateSelector(state), { unitId }))

  yield put(moveUnitToGroupResponse(unitId, targetGroupId))
}

export default (stateSelector: BattleStateSelector) => function* battleSaga() {
  yield takeEvery(BattleTypeKeys.REQUEST_ACTION, handleRequest(stateSelector))

  /*const check = checkState(stateSelector)

  while (true) {
      yield take('*')
      yield check()
  }*/
}
