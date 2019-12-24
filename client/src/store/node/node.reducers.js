import produce from 'immer'

import NodeActionTypes from './node.types'

const INITIAL_STATE = {
    group: null,
    isFetching: false,
    errorMessage: null
}

const nodeReducers = (state = INITIAL_STATE, { type, payload }) =>
    produce(state, draft => {
        switch (type) {
            case NodeActionTypes.FETCH_START:
                draft.isFetching = true
                break

            case NodeActionTypes.FETCH_SUCCESS:
                draft.isFetching = false
                draft.group = payload
                break

            case NodeActionTypes.FETCH_FAILURE:
                draft.isFetching = false
                draft.errorMessage = payload
                break

            case NodeActionTypes.APPEND_TO_PARENT_NODE: {
                const { parentId, nodeId, newNode, newNodeId } = payload

                /* FIREBASE DATA MODELING */

                if (parentId === 0) {
                    // insert new node into nodes
                    draft.group[newNodeId] = newNode
                }

                // insert new node ID into frameNodes (all, roots)
                // insert new node ID into

                break
            }

            default:
                return draft
        }
    })

export default nodeReducers

/* 
    case NodeActionTypes.APPEND_CHILD_NODE:
    case NodeActionTypes.APPEND_SIBLING_NODE:
    case NodeActionTypes.SET_ACTIVE_GROUP:
    case NodeActionTypes.TOGGLE_NODE_COLLAPSE:
    case NodeActionTypes.TOGGLE_NODE_CHECK_ONE:
    case NodeActionTypes.TOGGLE_NODE_CHECK_CASCADE:
    case NodeActionTypes.DRAG_CHILD_NODE:

*/

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
