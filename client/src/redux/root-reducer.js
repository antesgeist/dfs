import { combineReducers } from 'redux'

import userReducer from './user/user.reducers'
import panelReducer from './panel/panel.reducer'
import frameReducer from './frame/frame.reducer'

const rootReducer = combineReducers({
    user: userReducer,
    panel: panelReducer,
    frames: frameReducer
})

export default rootReducer
