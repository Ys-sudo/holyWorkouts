import { createStore, combineReducers, applyMiddleware } from 'redux'
import searchReducer from './reducers/search'
import thunk from 'redux-thunk'

const reducer = combineReducers({
  searchReducer
})
const store = createStore(
  reducer,
  applyMiddleware(thunk)
)

export default store;
