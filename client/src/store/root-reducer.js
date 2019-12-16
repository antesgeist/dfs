import { combineReducers } from 'redux'

import authReducer from './auth/auth.reducers'
import userReducer from './user/user.reducers'
import workspaceReducer from './workspace/workspace.reducers'
import panelReducer from './panel/panel.reducer'
import frameReducer from './frame/frame.reducer'
import frameNodesReducer from './frame-nodes/frame-nodes.reducers'
import nodeReducers from './node/node.reducers'

const rootReducer = combineReducers({
    auth: authReducer,
    users: userReducer,
    workspaces: workspaceReducer,
    panels: panelReducer,
    frames: frameReducer,
    frameNodes: frameNodesReducer,
    nodes: nodeReducers
})

export default rootReducer
