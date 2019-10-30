import { combineReducers } from 'redux'

import workspaceReducer from './workspace/workspace.reducer'
import canvasReducer from './canvas/canvas.reducer'

const rootReducer = combineReducers({
    workspaces: workspaceReducer,
    canvas: canvasReducer
})

export default rootReducer
