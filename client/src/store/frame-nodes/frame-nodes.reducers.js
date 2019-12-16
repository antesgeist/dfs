import FrameNodesActionTypes from './frame-nodes.types'

const INITIAL_STATE = {
    group: null,
    isFetching: false,
    errorMessage: null
}

const frameNodesReducer = (
    state = INITIAL_STATE,
    { type, payload }
) => {
    switch (type) {
        case FrameNodesActionTypes.FETCH_START:
            return {
                ...state,
                isFetching: true
            }
        case FrameNodesActionTypes.FETCH_SUCCESS:
            return {
                ...state,
                group: payload,
                isFetching: false
            }
        case FrameNodesActionTypes.FETCH_FAILURE:
            return {
                ...state,
                errorMessage: payload,
                isFetching: false
            }

        default:
            return state
    }
}

export default frameNodesReducer
