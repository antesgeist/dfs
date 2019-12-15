import { combineReducers } from 'redux'

import authReducer from './auth/auth.reducers'
import userReducer from './user/user.reducers'
import workspaceReducer from './workspace/workspace.reducers'
import panelReducer from './panel/panel.reducer'
import frameReducer from './frame/frame.reducer'

const rootReducer = combineReducers({
    auth: authReducer,
    users: userReducer,
    workspaces: workspaceReducer,
    panels: panelReducer,
    frames: frameReducer
})

export default rootReducer
