import WorkspaceActionTypes from './workspace.types'

const INITIAL_STATE = {
    workspaceItems: null,
    isFetching: false,
    errorMessage: null
}

const workspaceReducer = (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case WorkspaceActionTypes.FETCH_WORKSPACE_START:
            return {
                ...state,
                isFetching: true
            }
        case WorkspaceActionTypes.FETCH_WORKSPACE_SUCCESS:
            return {
                ...state,
                isFetching: false,
                workspaceItems: payload
            }
        case WorkspaceActionTypes.FETCH_WORKSPACE_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessage: payload
            }
        default:
            return state
    }
}

export default workspaceReducer
