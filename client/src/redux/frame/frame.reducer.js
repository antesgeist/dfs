import frameActionTypes from './frame.types'
import { mapToggleStates } from './frame.utils'

const INITIAL_STATE = {
    canvasFrames: null,
    isFetching: false,
    errorMessage: null
}

const frameReducer = (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case frameActionTypes.FETCH_FRAMES_START:
            return {
                ...state,
                isFetching: true
            }
        case frameActionTypes.FETCH_FRAMES_SUCCESS:
            return {
                ...state,
                isFetching: false,
                canvasFrames: payload
            }
        case frameActionTypes.FETCH_FRAMES_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessage: payload
            }
        case frameActionTypes.TOGGLE_NODE_COLLAPSE:
            return {
                ...state,
                canvasFrames: mapToggleStates(state.canvasFrames, payload)
            }
        case frameActionTypes.TOGGLE_NODE_CHECK_ONE:
            return {
                ...state,
                canvasFrames: mapToggleStates(state.canvasFrames, payload)
            }
        default:
            return state
    }
}

export default frameReducer
