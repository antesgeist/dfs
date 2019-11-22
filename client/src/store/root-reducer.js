import { combineReducers } from 'redux'

import userReducer from './user/user.reducers'
import workspaceReducer from './workspace/workspace.reducers'
import panelReducer from './panel/panel.reducer'
import frameReducer from './frame/frame.reducer'

const rootReducer = combineReducers({
    user: userReducer,
    workspace: workspaceReducer,
    panel: panelReducer,
    frames: frameReducer
})

export default rootReducer
