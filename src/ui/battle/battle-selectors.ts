import { createSelector } from 'reselect'
import {
  CardState, DiceState, DiceToCardAssignment, GroupState, INIT_ROLLS, PlayerQuery, UnitState,
  UnitToGroupAssignment,
  CardToUnitAssignment, BattleState, DiceToUnitAssignment,
} from './battle-reducer'
import {DrawerAction} from "../common/Drawer";

export interface BattleSelectorProps {
  activeUnitId: string
}

export interface UIUnit {
  id: string
  name: string
  showSelectButton: boolean
}

export interface UIGroup {
  id: string
  units: UIUnit[]
}

export interface UIDice {
  id: string
  face: number
  isSelected: boolean
}

export interface UICard {
  id: string
  require: number
  target: string
  isSlotEmpty: boolean
}

export const activeUnitIdSelector = (state:BattleState, props:BattleSelectorProps) => props.activeUnitId
export const cardsSelector = (state:BattleState, props:BattleSelectorProps) => state.cards
export const groupsSelector = (state:BattleState, props:BattleSelectorProps) => state.groups
export const unitsSelector = (state:BattleState, props:BattleSelectorProps) => state.units
export const dicesSelector = (state:BattleState, props:BattleSelectorProps) => state.dices
export const querySelector = (state:BattleState, props:BattleSelectorProps) => state.query
export const diceToCardAssignmentsSelector = (state:BattleState, props:BattleSelectorProps) => state.diceToCardAssignments
export const cardToUnitAssignmentsSelector = (state:BattleState, props:BattleSelectorProps) => state.cardToUnitAssignments
export const diceToUnitAssignmentsSelector = (state:BattleState, props:BattleSelectorProps) => state.diceToUnitAssignments
export const unitToGroupAssignmentsSelector = (state:BattleState, props:BattleSelectorProps) => state.unitToGroupAssignments


export const activeUnitSelector = createSelector<BattleState,BattleSelectorProps,string,UnitState[],UnitState|undefined>(
  activeUnitIdSelector,
  unitsSelector,
  (activeUnitId, units) => {
    return units.find(unit => unit.id === activeUnitId)
  })

export const diceDrawerActionsSelector = createSelector<BattleState, BattleSelectorProps,UnitState|undefined, DrawerAction[]>(
  activeUnitSelector,
  (activeUnit):DrawerAction[]=>activeUnit ? [
    {
      id: 'roll',
      name: `Roll(${activeUnit.rolls})`,
      disabled: activeUnit.rolls === 0,
      visible: activeUnit.phase === 'rolling'
    },
    {
      id: 'keep',
      name: 'Keep',
      disabled: activeUnit.rolls === INIT_ROLLS,
      visible: activeUnit.phase === 'rolling'
    }
  ] : []
)

export const cardDrawerActionsSelector = createSelector<BattleState, BattleSelectorProps,UnitState|undefined, DrawerAction[]>(
  activeUnitSelector,
  (activeUnit):DrawerAction[]=> activeUnit ? [
    {
      id: 'accept-assignment',
      name: 'Accept',
      disabled: activeUnit.rolls === 0,
      visible: activeUnit.phase === 'assigning'
    }
  ] : []
)

export const groupsWithUnitsSelector = createSelector<BattleState, BattleSelectorProps,GroupState[],UnitState[],PlayerQuery|undefined,UnitToGroupAssignment[], UIGroup[]>(
  groupsSelector,
  unitsSelector,
  querySelector,
  unitToGroupAssignmentsSelector,
  (groups,units, query, unitToGroupAssignments):UIGroup[] => groups.map(group => ({
    id: group.id,
    units: unitToGroupAssignments
      .filter(utga => utga.groupId === group.id)
      .reduce((acc:UnitState[], utga:UnitToGroupAssignment):UnitState[] => {
        const unit = units.find(unit => unit.id === utga.unitId)
        if(unit){
          acc.push(unit)
        }
        return acc
      },[])
      .map(unit => ({
        id: unit.id,
        name: unit.name,
        showSelectButton: query !== undefined && query.from === 'unit' && query.where.every(whereClause => {
          if(whereClause.type === 'one-of'){
            return whereClause.value.indexOf(unit[whereClause.prop]) !== -1
          }
          return false
        })
      }))
  }))
)

export const unitDicesSelector = createSelector<BattleState,BattleSelectorProps,string,DiceState[],DiceToUnitAssignment[],DiceToCardAssignment[],UIDice[]>(
  activeUnitIdSelector,
  dicesSelector,
  diceToUnitAssignmentsSelector,
  diceToCardAssignmentsSelector,
  (activeUnitId, dices, diceToUnitAssignments, diceToCardAssignments): UIDice[] => {
      return diceToUnitAssignments
          .filter(ass => ass.unitId === activeUnitId)
          .reduce((acc:DiceState[],ass:DiceToUnitAssignment) => {
              const dice =  dices.find(dice => dice.id === ass.diceId)
              if(dice){
                  acc.push(dice)
              }
              return acc
          },[])
          .map((dice:DiceState):UIDice => ({
              id:dice.id,
              face:dice.face,
              isSelected: diceToCardAssignments.find(a => a.diceId === dice.id) !== undefined
          }))
  }
)

export const unitCardsSelector = createSelector<BattleState,BattleSelectorProps,string,CardState[],CardToUnitAssignment[],DiceToCardAssignment[],UICard[]>(
  activeUnitIdSelector,
  cardsSelector,
  cardToUnitAssignmentsSelector,
  diceToCardAssignmentsSelector,
  (activeUnitId, cards, cardToUnitAssignments, diceToCardAssignments): UICard[] => cardToUnitAssignments
    .filter(ass => ass.unitId === activeUnitId)
    .reduce((acc:CardState[],ass:CardToUnitAssignment) => {
      const card =  cards.find(card => card.id === ass.cardId)
      if(card){
        acc.push(card)
      }
      return acc
    },[])
    .map((card:CardState):UICard => ({
      id:card.id,
      require:card.require,
      target:card.target,
      isSlotEmpty: diceToCardAssignments.find(a => a.cardId === card.id) !== undefined
    }))
)

export function getControlledUnits(state:BattleState, playerId:string){
    return state.unitToPlayerAssignments
        .filter((ass => ass.playerId === playerId))
        .map(ass => ass.unitId)
        .map(unitId => state.units.filter(unit => unit.id === unitId)[0])
        .filter(unit => !!unit)
}