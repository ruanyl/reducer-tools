## reducer tools ![travis](https://travis-ci.org/ruanyl/reducer-tools.svg?branch=master)

Create reducer easily

#### Usage
```typescript
import { createReducer } from 'reducer-tools'

const initialState = { total: 0 }
const increase = s => ({ ...s, total: s.total + 1 })
const decrease = s => ({ ...s, total: s.total - 1 })

const reducer = createReducer(initialState, {
  'increase': increase,
  'decrease': decrease,
})

const a1 = { type: 'increase' }
const s1 = reducer(initialState, a1)
expect(s1.total).toBe(1)
```

#### Use reducer helps
```typescript
import { createReducer, payloadReducer } from 'reducer-tools'

const add = value => state => ({ ...state, total: state.total + value })
const subtract = value => state => ({ ...state, total: state.total - value })
const reducer = createReducer(initialState, {
  'add': payloadReducer(add),
  'subtract': payloadReducer(subtract),
})

const a1 = { type: 'add', payload: 10 }
const s1 = reducer(initialState, a1)
expect(s1.total).toBe(10)
```
