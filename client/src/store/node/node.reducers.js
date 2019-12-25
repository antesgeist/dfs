import produce from 'immer'

import NodeActionTypes from './node.types'

const INITIAL_STATE = {
    groupByFrames: null,
    groupByNodes: null,
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
                draft.groupByFrames = payload.frameNodes
                draft.groupByNodes = payload.nodeGroup
                break

            case NodeActionTypes.FETCH_FAILURE:
                draft.isFetching = false
                draft.errorMessage = payload
                break

            case NodeActionTypes.TOGGLE_NODE_COLLAPSE: {
                const { parentId, event } = payload

                draft.groupByNodes[parentId].state.collapsed = !draft
                    .groupByNodes[parentId].state.collapsed

                break
            }

            case NodeActionTypes.TOGGLE_NODE_CHECK_ONE: {
                const { nodeId, event } = payload

                draft.groupByNodes[nodeId].state.checked = !draft.groupByNodes[
                    nodeId
                ].state.checked

                break
            }

            case NodeActionTypes.APPEND_TO_PARENT_NODE: {
                const { frameId, parentId, newNodeId, newNode } = payload

                // insert node to lookup table first
                draft.groupByNodes[newNodeId] = newNode

                // update descendant reference ids
                if (parentId === 0) {
                    draft.groupByFrames[frameId].roots.push(newNodeId)
                    draft.groupByFrames[frameId].all.push(newNodeId)
                } else {
                    draft.groupByFrames[frameId].all.push(newNodeId)
                    draft.groupByNodes[parentId].descendant.push(newNodeId)
                }

                break
            }

            case NodeActionTypes.APPEND_CHILD_NODE: {
                const { frameId, nodeId, newNodeId, newNode } = payload

                draft.groupByNodes[newNodeId] = newNode
                draft.groupByFrames[frameId].all.push(newNodeId)
                draft.groupByNodes[nodeId].descendant.push(newNodeId)

                break
            }

            default:
                return draft
        }
    })

export default nodeReducers

// case FrameActionTypes.DRAG_CHILD_NODE:
//     draft.frameGroups = mapNodeStates(
//         frameGroups,
//         activeFrameGroup,
//         payload
//     )
//     break
