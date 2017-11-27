import {PlayerQuery, PlayerQuerySelectTarget} from "./battle-reducer";

export function getRandomArbitrary(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min) as any
}

export function checkCondition(target: PlayerQuerySelectTarget,obj:any, {select,where}: PlayerQuery): boolean{
    if(select !== target) return false
    if(!where) return true
    if(where.type === 'match'){
        if(where.operator === '='){
            return obj[where.prop] === where.value
        } else if(where.operator === '!='){
            return obj[where.prop] !== where.value
        }
    }
    return false
}