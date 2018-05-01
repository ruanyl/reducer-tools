export interface Action {
  type: string;
}

export interface Handlers {
  [key: string]: (s: any, a: Action) => any
}

export const createReducer = (initialState: any, handlers: Handlers) => {
  return (state = initialState, action: Action) => {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action)
    } else {
      return state
    }
  }
}

const prop = p => o => o[p]
export const transformReducer = transform => reducer => (s, a) => reducer(transform(a))(s)
export const propReducer = p => transformReducer(prop(p))
export const payloadReducer = propReducer('payload')
export const valueReducer = propReducer('value')
