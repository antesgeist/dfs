import WorkspaceActionTypes from './workspace.types'

const INITIAL_STATE = {
    panelGroups: null,
    isFetching: false,
    errorMessage: null
}

const workspaceReducer = (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case WorkspaceActionTypes.FETCH_START:
            return {
                ...state,
                isFetching: true
            }
        case WorkspaceActionTypes.FETCH_SUCCESS:
            return {
                ...state,
                panelGroups: payload,
                isFetching: false
            }
        case WorkspaceActionTypes.FETCH_FAILURE:
            return {
                ...state,
                errorMessage: payload,
                isFetching: false
            }
        default:
            return state
    }
}

export default workspaceReducer
