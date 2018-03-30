
export interface Action<T,P> {
  type: T
  payload?: P
  error?: any
}

export type ActionFunction0<R> = () => R
export type ActionFunction1<T1, R> = (t1: T1) => R
export type ActionFunction2<T1, T2, R> = (t1: T1, t2: T2) => R
export type ActionFunction3<T1, T2, T3, R> = (t1: T1, t2: T2, t3: T3) => R
export type ActionFunction4<T1, T2, T3, T4, R> = (t1: T1, t2: T2, t3: T3, t4: T4) => R
export type ActionFunction5<T1, T2, T3, T4, T5, R> = (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5) => R
export type ActionFunction6<T1, T2, T3, T4, T5, T6, R> = (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5, t6: T6) => R
export type ActionFunctionAny<R> = (...args: any[]) => R

export function createAction<T, P, M>(
  type: T,
  payloadCreator: ActionFunction0<P>,
  metaCreator: ActionFunction0<M>,
): ActionFunction0<Action<T,P>>

export function createAction<T, P, M, A1>(
  type: T,
  payloadCreator: ActionFunction1<A1,P>,
  metaCreator: ActionFunction1<A1,M>,
): ActionFunction1<A1, Action<T,P>>

export function createAction<T, P, M, A1, A2>(
  type: T,
  payloadCreator: ActionFunction2<A1,A2,P>,
  metaCreator: ActionFunction2<A1,A2,M>,
): ActionFunction2<A1,A2,Action<T,P>>

export function createAction<T, P, M, A1, A2, A3>(
  type: T,
  payloadCreator: ActionFunction3<A1,A2,A3,P>,
  metaCreator: ActionFunction3<A1,A2,A3,M>,
): ActionFunction3<A1,A2,A3,Action<T,P>>

export function createAction<T, P, M, A1, A2, A3, A4>(
  type: T,
  payloadCreator: ActionFunction4<A1,A2,A3,A4,P>,
  metaCreator: ActionFunction4<A1,A2,A3,A4,M>,
): ActionFunction4<A1,A2,A3,A4,Action<T,P>>

export function createAction<T, P, M, A1, A2, A3, A4, A5>(
  type: T,
  payloadCreator: ActionFunction5<A1,A2,A3,A4,A5,P>,
  metaCreator: ActionFunction5<A1,A2,A3,A4,A5,M>,
): ActionFunction5<A1,A2,A3,A4,A5,Action<T,P>>

export function createAction<T, P, M, A1, A2, A3, A4, A5, A6>(
  type: T,
  payloadCreator: ActionFunction6<A1,A2,A3,A4,A5,A6,P>,
  metaCreator: ActionFunction6<A1,A2,A3,A4,A5,A6,M>,
): ActionFunction6<A1,A2,A3,A4,A5,A6, Action<T,P>> {
  return (a1:A1,a2:A2,a3:A3,a4:A4,a5:A5,a6:A6) => {
    return ({
      type,
      ...(payloadCreator && { payload: payloadCreator(a1,a2,a3,a4,a5,a6) }),
      ...(metaCreator && { meta: metaCreator(a1, a2, a3, a4, a5, a6) }),
    })
  }
}