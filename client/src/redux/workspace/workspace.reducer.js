import WorkspaceActionTypes from './workspace.types'

const INITIAL_STATE = {
    workspaceItems: [
        {
            userId: 1,
            id: 1,
            title: 'Frame Tree',
            isActive: true
        },
        {
            userId: 1,
            id: 2,
            title: 'Canvas Features',
            isActive: false
        },
        {
            userId: 1,
            id: 3,
            title: 'Frame Maximize',
            isActive: false
        },
        {
            userId: 1,
            id: 4,
            title: 'New Frame',
            isActive: false
        }
    ],
    errorMessage: null
}

const workspaceReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case WorkspaceActionTypes.FETCH_WORKSPACE:
            return {
                ...state
                // workspaceItems: action.payload
            }
        default:
            return state
    }
}

export default workspaceReducer
