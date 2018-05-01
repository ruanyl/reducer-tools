import { createReducer, valueReducer, payloadReducer } from '../src'

describe('create reducer', () => {
  let initialState
  beforeEach(() => {
    initialState = { total: 0 }
  })

  it('should return initial state', () => {
    const reducer = createReducer(initialState, {
      'increase': (s, a) => ({ ...s, total: s.total + 1 }),
      'decrease': (s, a) => ({ ...s, total: s.total - 1 })
    })
    const a1 = { type: 'something' }
    const s1 = reducer(initialState, a1)
    expect(s1).toBe(initialState)
  });


  it('should update the state by reducer', () => {
    const reducer = createReducer(initialState, {
      'increase': (s, a) => ({ ...s, total: s.total + 1 }),
      'decrease': (s, a) => ({ ...s, total: s.total - 1 })
    })
    const a1 = { type: 'increase' }
    const s1 = reducer(initialState, a1)
    expect(s1.total).toBe(1)

    const a2 = { type: 'decrease' }
    const s2 = reducer(s1, a2)
    expect(s2.total).toBe(0)
  })

  it('uses valueReducer to update state', () => {
    const add = value => state => ({ ...state, total: state.total + value })
    const subtract = value => state => ({ ...state, total: state.total - value })
    const reducer = createReducer(initialState, {
      'add': valueReducer(add),
      'subtract': valueReducer(subtract),
    })

    const a1 = { type: 'add', value: 10 }
    const s1 = reducer(initialState, a1)
    expect(s1.total).toBe(10)

    const a2 = { type: 'subtract', value: 2 }
    const s2 = reducer(s1, a2)
    expect(s2.total).toBe(8)
  })

  it('uses payloadReducer to update state', () => {
    const add = value => state => ({ ...state, total: state.total + value })
    const subtract = value => state => ({ ...state, total: state.total - value })
    const reducer = createReducer(initialState, {
      'add': payloadReducer(add),
      'subtract': payloadReducer(subtract),
    })

    const a1 = { type: 'add', payload: 10 }
    const s1 = reducer(initialState, a1)
    expect(s1.total).toBe(10)

    const a2 = { type: 'subtract', payload: 2 }
    const s2 = reducer(s1, a2)
    expect(s2.total).toBe(8)
  })
})
