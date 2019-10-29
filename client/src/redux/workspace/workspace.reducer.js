import WorkspaceActionTypes from './workspace.types'

const INITIAL_STATE = {
    workspaceItems: null,
    errorMessage: null
}

const workspaceReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case WorkspaceActionTypes.FETCH_WORKSPACE:
            return {
                ...state,
                workspaceItems: action.payload
            }
        default:
            return state
    }
}

export default workspaceReducer
