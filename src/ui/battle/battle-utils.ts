import {PlayerQuery, PlayerQuerySelectTarget, WhereClauseType} from "./battle-reducer";

export function getRandomArbitrary(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min) as any
}

export function checkCondition(target: PlayerQuerySelectTarget, obj: any, queries: PlayerQuery[]): boolean {
    return queries.reduce((acc, {select, where}) => {
        if (acc === true) return true
        if (select !== target) return false
        if (!where) return true
        if (where.type === WhereClauseType.MATCH_ALL) {
            if (where.operator === '=') {
                return obj[where.prop] === where.value
            } else if (where.operator === '!=') {
                return obj[where.prop] !== where.value
            }
        }
        return false
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

let idCounter = 0

export function getUniqueId(namespace: string) {
    return `${namespace}-${idCounter++}`
}

export type MapValuesFunc = <T, R>(key: string, value: T) => R
export const mapValuesIdentity: MapValuesFunc = (key: string, inp) => inp as any

export function mapValues<T>(obj: { [key: string]: T }, func: MapValuesFunc = mapValuesIdentity): T[] {
    return Object.keys(obj).map(key => func(key, obj[key]))
}

export interface FilterIdMapFunction<T> {
    // noinspection JSUnusedLocalSymbols
    (value: T): boolean
}

export function filterIdMap<T>(map: IdMap<T>, filterFunc: FilterIdMapFunction<T>) {
    return Object.keys(map).reduce((acc: IdMap<T>, mapKey: string): IdMap<T> => {
        if (filterFunc(map[mapKey])) {
            acc[mapKey] = map[mapKey]
        }
        return acc
    }, {})
}

export interface UpdateIdMapFunc<T> {
    // noinspection JSUnusedLocalSymbols
    (value: T): T
}

export function updateIdMap<T>(map: IdMap<T>, id: string, updateFunc: UpdateIdMapFunc<T>) {
    return {
        ...map,
        [id]: updateFunc(map[id])
    }
}

export function mapIdMapValues<T>(map: IdMap<T>, func: UpdateIdMapFunc<T>): IdMap<T> {
    return Object.keys(map).reduce((acc: IdMap<T>, key: string): IdMap<T> => {
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