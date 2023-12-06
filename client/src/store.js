import {
    configureStore
} from '@reduxjs/toolkit'
// import {
//     createStore,
//     applyMiddleware,
//     compose
// } from 'redux'
// import thunk from 'redux-thunk'
import rootReducers from './reducers'
const initalState = {}
// const middleware = [thunk]
// const store = createStore(rootReducers, initalState, compose(applyMiddleware(...middleware),
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()))
// export default store

const store = configureStore({
    reducer: rootReducers,
    preloadedState: initalState
})
export default store