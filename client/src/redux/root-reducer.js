import { combineReducers } from 'redux'

import workspaceReducer from './workspace/workspace.reducer'

const rootReducer = combineReducers({
    workspaces: workspaceReducer
})

export default rootReducer
