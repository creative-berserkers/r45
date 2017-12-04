import {PlayerQuery, PlayerQuerySelectTarget, WhereClauseType} from "./battle-reducer";

export function getRandomArbitrary(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min) as any
}

export function checkCondition(target: PlayerQuerySelectTarget,obj:any, queries: PlayerQuery[]): boolean{
    return queries.reduce((acc,{select,where}) => {
        if(acc === true) return true
        if(select !== target) return false
        if(!where) return true
        if(where.type === WhereClauseType.MATCH_ALL){
            if(where.operator === '='){
                return obj[where.prop] === where.value
            } else if(where.operator === '!='){
                return obj[where.prop] !== where.value
            }
        }
        return false
    }, false)
}