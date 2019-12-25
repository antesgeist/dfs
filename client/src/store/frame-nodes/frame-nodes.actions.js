import FrameNodesActionTypes from './frame-nodes.types'

export const fetchFrameNodesSuccess = frameNodesGroup => ({
    type: FrameNodesActionTypes.FETCH_SUCCESS,
    payload: frameNodesGroup
})

export const saveNewNodeId = (parentId, newNodeId) => ({
    type: FrameNodesActionTypes.SAVE_NEW_NODE_ID,
    payload: { parentId, newNodeId }
})
