import { createStore,applyMiddleware } from'redux'
import thunk from 'redux-thunk'

const reducer = (state = { name:'CJW' }, action) => {
    return state
}

const getStore = () => {
    return createStore(reducer,applyMiddleware(thunk))
}

export default getStore