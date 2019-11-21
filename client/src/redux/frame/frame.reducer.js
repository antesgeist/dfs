import frameActionTypes from './frame.types'
import { mapToggleStates } from './frame.utils'

const INITIAL_STATE = {
    frameGroups: null,
    activeFrameGroup: null,
    isFetching: false,
    errorMessage: null
}

const frameReducer = (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case frameActionTypes.FETCH_START:
            return {
                ...state,
                isFetching: true
            }
        case frameActionTypes.FETCH_SUCCESS:
            return {
                ...state,
                isFetching: false,
                frameGroups: payload
            }
        case frameActionTypes.FETCH_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessage: payload
            }
        case frameActionTypes.SET_ACTIVE_GROUP:
            return {
                ...state,
                activeFrameGroup: payload
            }
        case frameActionTypes.TOGGLE_NODE_COLLAPSE:
            return {
                ...state,
                frameGroups: mapToggleStates(state.frameGroups, payload)
            }
        case frameActionTypes.TOGGLE_NODE_CHECK_ONE:
            return {
                ...state,
                frameGroups: mapToggleStates(state.frameGroups, payload)
            }
        default:
            return state
    }
}

export default frameReducer
