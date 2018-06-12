import { AnyAction, Reducer } from 'redux'

export type State = any
export interface ReducerMap {
  [key: string]: Reducer
}
export type FunctionalReducer = (v: any) => (s: State) => State
export type TransformFunction = (a: AnyAction) => any

export const createReducer = (initialState: State, reducerMap: ReducerMap) => {
  return (state: State = initialState, action: AnyAction) => {
    if (reducerMap.hasOwnProperty(action.type)) {
      return reducerMap[action.type](state, action)
    } else {
      return state
    }
  }
}

const prop = (p: string) => (o: any) => o[p]
export const transformReducer = (transform: TransformFunction) => (reducer: FunctionalReducer) => (s: State, a: AnyAction) => reducer(transform(a))(s)
export const propReducer = (p: string) => transformReducer(prop(p))
export const payloadReducer = propReducer('payload')
export const valueReducer = propReducer('value')
