import { PlayerQuery, PlayerQuerySelectTarget, WhereClauseType } from './battle-reducer'

export function getRandomArbitrary(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min) as any
}

export function checkCondition(target: PlayerQuerySelectTarget, obj: any, queries: PlayerQuery[]): boolean {
  return queries.reduce((acc, { select, where }) => {
    if (acc === true) return true
    if (select !== target) return false
    if (!where) return true
    return where.every((where) => {
      if (where.type === WhereClauseType.MATCH_ALL) {
        if (where.operator === '=') {
          return obj[where.prop] === where.value
        }
        if (where.operator === '!=') {
          return obj[where.prop] !== where.value
        }
      }
      return false
    })
  }, false)
}


export type IdElement = { id: string }

export interface IdMap<T> {
  [key: string]: T
}

export function toIdMap<T extends IdElement>(elements: T[]): IdMap<T> {
  return elements.reduce((acc: IdMap<T>, element: T) => {
    acc[element.id] = element
    return acc
  }, {})
}

let idCounter = -1

export function getUniqueId(namespace: string): string {
  idCounter += 1
  return `${namespace}-${idCounter}`
}

export interface MapValuesFunc<T, R> {
  (value: T) : R
}

export const mapValuesIdentity: MapValuesFunc<any,any> = (inp: any) => inp

export function mapValues<T,R>(obj: { [key: string]: T }, func: MapValuesFunc<T,R> = mapValuesIdentity): R[] {
  return Object.keys(obj).map((key:string) => func(obj[key]))
}

export interface FilterIdMapFunction<T> {
  // noinspection JSUnusedLocalSymbols
  (value: T): boolean
}

export function filterIdMap<T>(map: IdMap<T>, filterFunc: FilterIdMapFunction<T>) : IdMap<T> {
  return Object.keys(map).reduce((acc: IdMap<T>, mapKey: string): IdMap<T> => {
    if (filterFunc(map[mapKey])) {
      acc[mapKey] = map[mapKey]
    }
    return acc
  }, {})
}

export interface UpdateIdMapFunc<T, R> {
  // noinspection JSUnusedLocalSymbols
  (value: T): R
}

export function updateIdMap<T, R>(map: IdMap<T>, id: string, updateFunc: UpdateIdMapFunc<T, R>) {
  return {
    ...map,
    [id]: updateFunc(map[id]),
  }
}

export function mapIdMapValues<T,R>(map: IdMap<T>, func: UpdateIdMapFunc<T, R>): IdMap<R> {
  return Object.keys(map).reduce((acc: IdMap<R>, key: string): IdMap<R> => {
    acc[key] = func(map[key])
    return acc
  }, {})
}

export function everyIdMapValue<T>(map: IdMap<T>, func: FilterIdMapFunction<T>): boolean {
  return Object.keys(map).reduce((acc: boolean, mapKey: string): boolean => {
    if (acc === false) return false
    return func(map[mapKey])
  }, true)
}

export function findIdMapValue<T>(map: IdMap<T>, func: FilterIdMapFunction<T>): T | undefined {
  const mapKey = Object.keys(map).find((mapKey: string): boolean => {
    return func(map[mapKey])
  })

  return mapKey ? map[mapKey] : undefined
}
