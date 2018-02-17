import { getRandomArbitrary, getUniqueId, mapValues, toIdMap } from './battle-utils'
import { DiceToCardAssignment, PlayerQuerySelectTarget, RollingPhases, StateMap, WhereClauseOperator, WhereClauseType } from './battle-reducer'
import { BattleTypeKeys, RollDicesResult } from "./battle-actions";

export enum RQExpressionTypes {
  LITERAL_EXPRESSION = 'LiteralExpression',
  UNARY_EXPRESSION = 'UnaryExpression',
  BINARY_EXPRESSION = 'BinaryExpression',
  LOGICAL_EXPRESSION = 'LogicalExpression',
  CONDITIONAL_EXPRESSION = 'ConditionalExpression',
  MEMBER_EXPRESSION = 'MemberExpression',
  IDENTIFIER_EXPRESSION = 'IdentifierExpression',
}

export enum RQUnaryOperators {
  PLUS = '+',
  MINUS = '-',
  NEGATE = '!',
}

export enum RQBinaryOperators {
  ADD = '+',
  SUBTRACT = '-',
  MULTIPLY = '*',
  DIVIDE = '/',
  MODULO = '%',
  POWER = '**',
  EQUAL = '==',
  NOT_EQUAL = '!=',
  LESS_THAN = '<',
  GREATER_THAN = '>',
  LESS_THEN_OR_EQUAL = '<=',
  GREATER_THEN_OR_EQUAL = '>=',
}

export enum RQLogicalOperators {
  AND = '&&',
  OR = '||',
}

export type RQOperators = RQUnaryOperators & RQBinaryOperators & RQLogicalOperators

export interface RQExpression {
  readonly type: RQExpressionTypes
}

export interface RQLiteralExpression extends RQExpression {
  readonly type: RQExpressionTypes.LITERAL_EXPRESSION
  readonly value: boolean | number | string
}

export interface RQUnaryExpression extends RQExpression {
  readonly type: RQExpressionTypes.UNARY_EXPRESSION
  readonly operator: RQUnaryOperators
  readonly argument: RQExpression
  readonly prefix: true
}

export interface RQBinaryExpression extends RQExpression {
  readonly type: RQExpressionTypes.BINARY_EXPRESSION
  readonly operator: RQBinaryOperators
  readonly left: RQExpression
  readonly right: RQExpression
}

interface RQLogicalExpression extends RQExpression {
  readonly type: RQExpressionTypes.LOGICAL_EXPRESSION
  readonly operator: RQLogicalOperators
  readonly left: RQExpression
  readonly right: RQExpression
}

interface RQConditionalExpression extends RQExpression {
  readonly type: RQExpressionTypes.CONDITIONAL_EXPRESSION
  readonly test: RQExpression
  readonly consequent: RQExpression
  readonly alternate?: RQExpression
}

interface RQMemberExpression extends RQExpression {
  readonly type: RQExpressionTypes.MEMBER_EXPRESSION
  readonly object: RQExpression
  readonly property: RQExpression
}

interface Identifier extends RQExpression {
  readonly type: RQExpressionTypes.IDENTIFIER_EXPRESSION
  readonly name: string
}

export const toExpression = (expressionString: string): RQExpression => {
  const testExpression: RQLiteralExpression = {
    type: RQExpressionTypes.LITERAL_EXPRESSION,
    value: 'test',
  }
  return testExpression
}

export interface BattleRequestHandlerState {
  id: string
  expression: RQExpression
  statement: RQExpression
}

export interface BattleRequestState {
  requestHandlers: StateMap<BattleRequestHandlerState>
}

export type BattleRequestActionTypes = undefined

export const REQUEST_HANDLER_NAMESPACE = 'rq-hnd'

export const INITIAL_STATE: BattleRequestState = {
  requestHandlers: toIdMap<BattleRequestHandlerState>([
    {
      id: getUniqueId(REQUEST_HANDLER_NAMESPACE),
      expression: toExpression(`action.type == '${BattleTypeKeys.ROLL_DICES_REQUEST} && unit.phase == '${RollingPhases.ROLLING}'`),
      statement: toExpression(`
        if(unit.rolls <= 0) return false
        
        let unitAssignments = mapValues(diceToCardAssignmentsMap).filter(dtca => dtca.unitId === unit.id)
        
        let rollDicesResult = unitAssignments.reduce((acc, assignment) => {
          acc[assignment.id] = assignment.cardId === 'unassigned' ? getRandomArbitrary(1, 7) : assignment.rollResult
          return acc
        }, {})
        
        diceToCardAssignmentsMap[assignment.id].rollResult = rollDicesResult
        unit.rolls = unit.rolls - 1
        unit.query = [
          {
            select: PlayerQuerySelectTarget.DICE,
            where: [{
              type: WhereClauseType.MATCH_ALL,
              prop: 'canBeAssignedToCard',
              operator: WhereClauseOperator.EQUAL,
              value: true,
            }],
          },
          {
            select: PlayerQuerySelectTarget.DICE_ACTION,
            where: [{
              type: WhereClauseType.MATCH_ALL,
              prop: 'id',
              operator: WhereClauseOperator.EQUAL,
              value: 'roll',
            }],
          },
          {
            select: PlayerQuerySelectTarget.DICE_ACTION,
            where: [{
              type: WhereClauseType.MATCH_ALL,
              prop: 'id',
              operator: WhereClauseOperator.EQUAL,
              value: 'keep',
            }],
          },
        ]
      `),
    },
    {
      id: getUniqueId(REQUEST_HANDLER_NAMESPACE),
      expression: toExpression(`action.type == '${BattleTypeKeys.ROLL_DICES_REQUEST} && unit.phase == '${RollingPhases.ROLLING}'`),
      statement: toExpression(`
        response = get(/SELECT diceAction WHERE diceAction.name == 'roll' /)
        
        units[response.unit].dices = [rnd(1,7),rnd(1,7),rnd(1,7)]
        while(units[response.unit].rolls > 0){
          response = get(/SELECT dice WHERE dice.canBeAssignedToCard == true 
            OR SELECT diceAction WHERE diceAction.name == 'roll' 
            OR SELECT diceAction WHERE diceAction.name == 'keep'
          /)
          
          if(response.type == 'keep'){
            return true
          }
          if(response.type == 'roll'){
            units[response.unit].rolls -= 1
            units[response.unit].dices = [rnd(1,7),rnd(1,7),rnd(1,7)]
          }
          if(response.type == 'dice'){
            card = units[response.unit].cards.find(card => card.require == response.value)
            if(card){
              card.assignment = response.value
            }
          }
        }
      `),
    },
  ]),
}

export function battleReducer(state: BattleRequestState = INITIAL_STATE, action: BattleRequestActionTypes): BattleRequestState {
  return state
}
