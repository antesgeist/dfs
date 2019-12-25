import produce from 'immer'
import FrameNodesActionTypes from './frame-nodes.types'

const INITIAL_STATE = {
    group: null,
    isFetching: false,
    errorMessage: null
}

const frameNodesReducer = (state = INITIAL_STATE, { type, payload }) =>
    produce(state, draft => {
        switch (type) {
            case FrameNodesActionTypes.FETCH_SUCCESS:
                draft.group = payload
                draft.isFetching = false
                break

            case FrameNodesActionTypes.SAVE_NEW_NODE_ID: {
                const { frameId, parentId, newNodeId } = payload

                console.log(draft.group[frameId])

                if (parentId === 0) {
                    draft.group[frameId].roots.push(newNodeId)
                    draft.group[frameId].all.push(newNodeId)
                } else {
                    draft.group[frameId].all.push(newNodeId)
                }
                break
            }

            default:
                return state
        }
    })

export default frameNodesReducer
