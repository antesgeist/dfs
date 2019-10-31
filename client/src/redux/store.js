import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

import rootReducer from './root-reducer'

const middlewares = [thunk, logger]

/* eslint-disable no-underscore-dangle */
/* eslint-disable operator-linebreak */
export const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(...middlewares),
        window.__REDUX_DEVTOOLS_EXTENSION__
            ? window.__REDUX_DEVTOOLS_EXTENSION__()
            : f => f
    )
)
/* eslint-enable */
