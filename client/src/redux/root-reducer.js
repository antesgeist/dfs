import { combineReducers } from 'redux'

import userReducer from './user/user.reducers'
import workspaceReducer from './workspace/workspace.reducer'
import frameReducer from './frame/frame.reducer'

const rootReducer = combineReducers({
    user: userReducer,
    workspace: workspaceReducer,
    frames: frameReducer
})

export default rootReducer
