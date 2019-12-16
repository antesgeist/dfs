import NodeActionTypes from './node.types'

const INITIAL_STATE = {
    group: null,
    isFetching: false,
    errorMessage: null
}

const nodeReducers = (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case NodeActionTypes.FETCH_START:
            return {
                ...state,
                isFetching: true
            }
        case NodeActionTypes.FETCH_SUCCESS:
            return {
                ...state,
                isFetching: false,
                group: payload
            }
        case NodeActionTypes.FETCH_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessage: payload
            }
        case NodeActionTypes.APPEND_CHILD_NODE:
        case NodeActionTypes.APPEND_TO_PARENT_NODE:
        case NodeActionTypes.APPEND_SIBLING_NODE:
        case NodeActionTypes.SET_ACTIVE_GROUP:
        case NodeActionTypes.TOGGLE_NODE_COLLAPSE:
        case NodeActionTypes.TOGGLE_NODE_CHECK_ONE:
        case NodeActionTypes.TOGGLE_NODE_CHECK_CASCADE:
        case NodeActionTypes.DRAG_CHILD_NODE:
            return {
                ...state,
                group: {
                    ...state.group,
                    [payload.nodeId]: payload
                }
            }
        default:
            return state
    }
}

export default nodeReducers

// case FrameActionTypes.TOGGLE_NODE_COLLAPSE:
//     draft.frameGroups = mapNodeStates(
//         frameGroups,
//         activeFrameGroup,
//         payload
//     )
//     break

// case FrameActionTypes.TOGGLE_NODE_CHECK_ONE:
//     draft.frameGroups = mapNodeStates(
//         frameGroups,
//         activeFrameGroup,
//         payload
//     )
//     break

// case FrameActionTypes.DRAG_CHILD_NODE:
//     draft.frameGroups = mapNodeStates(
//         frameGroups,
//         activeFrameGroup,
//         payload
//     )
//     break

// case FrameActionTypes.APPEND_TO_PARENT_NODE:
//     draft.frameGroups = mapNodeStates(
//         frameGroups,
//         activeFrameGroup,
//         payload
//     )
//     break

// case FrameActionTypes.APPEND_CHILD_NODE:
//     draft.frameGroups = mapNodeStates(
//         frameGroups,
//         activeFrameGroup,
//         payload
//     )
//     break
