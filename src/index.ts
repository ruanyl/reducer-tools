export interface AnyAction {
  type: string;
}

export type State = any
export type ReducerMap<A extends AnyAction, S = State> = {
  [P in A['type']]?: A extends { type: P } ? (state: S, action: A) => State : never
}

export const createReducer = <A extends AnyAction, S = State>(initialState: S, reducerMap: ReducerMap<A, S>) => {
  return (state: S = initialState, action: A): S => {
    if (reducerMap.hasOwnProperty(action.type)) {
      return (reducerMap as any)[action.type](state, action)
    } else {
      return state
    }
  }
}
