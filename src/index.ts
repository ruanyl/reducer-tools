export interface AnyAction {
  type: string;
}

export type State = any
export type Reducer<S, A> = (state: S, action: A) => State;
export type ReducerMap<A extends AnyAction, S = State> = {
  [key in A['type']]?: (state: S, action: A) => State
}
type FunctionalReducer = (v: any) => (s: State) => State
type TransformFunction = (a: AnyAction) => any

export const createReducer = <T extends AnyAction, S = State>(initialState: S, reducerMap: ReducerMap<T, S>) => {
  return (state: S = initialState, action: T) => {
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

interface LoginData {
  email: string;
  password: string;
}

type a = ReturnType<any>

export interface UserData {
  id: string;
  email: string;
  profilePicture: string;
}

export type LoginAction =
  | { type: 'LOGIN_REQUEST'; value: LoginData }
  | { type: 'LOGIN_SUCCESS'; value: UserData }
  | { type: 'LOGIN_FAILED'; value: string };

type c = ReducerMap<LoginAction>
const cc: c = {
  'LOGIN_FAILED': (s, a) => a.value,
}
