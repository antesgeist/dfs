import FrameActionTypes from './frame.types'
import { mapNodeStates } from './frame.utils'

const INITIAL_STATE = {
    frameGroups: null,
    activeFrameGroup: null,
    isFetching: false,
    errorMessage: null
}

const frameReducer = (state = INITIAL_STATE, { type, payload }) => {
    const { frameGroups, activeFrameGroup } = state

    switch (type) {
        case FrameActionTypes.FETCH_START:
            return {
                ...state,
                isFetching: true
            }
        case FrameActionTypes.FETCH_SUCCESS:
            return {
                ...state,
                isFetching: false,
                frameGroups: payload
            }
        case FrameActionTypes.FETCH_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessage: payload
            }
        case FrameActionTypes.SET_ACTIVE_GROUP:
            return {
                ...state,
                activeFrameGroup: payload
            }
        case FrameActionTypes.TOGGLE_NODE_COLLAPSE:
            return {
                ...state,
                frameGroups: mapNodeStates(
                    frameGroups,
                    activeFrameGroup,
                    payload
                )
            }

        /* TOGGLE EVENTS */

        case FrameActionTypes.TOGGLE_NODE_CHECK_ONE:
            return {
                ...state,
                frameGroups: mapNodeStates(
                    frameGroups,
                    activeFrameGroup,
                    payload
                )
            }
        case FrameActionTypes.APPEND_NEW_NODE:
            return {
                ...state,
                frameGroups: mapNodeStates(
                    frameGroups,
                    activeFrameGroup,
                    payload
                )
            }

        /* DRAG EVENTS */

        case FrameActionTypes.DRAG_CHILD_NODE:
            return {
                ...state,
                frameGroups: mapNodeStates(
                    frameGroups,
                    activeFrameGroup,
                    payload
                )
            }

        default:
            return state
    }
}

export default frameReducer
