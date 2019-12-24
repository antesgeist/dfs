import FrameNodesActionTypes from './frame-nodes.types'

import { formatFrameNodesForDispatch } from '../store.utils'

// import { fetchNodesAsync } from '../node/node.actions'
import { selectCurrentWorkspace } from '../auth/auth.selectors'

export const fetchFrameNodesStart = () => ({
    type: FrameNodesActionTypes.FETCH_START
})

export const fetchFrameNodesSuccess = frameNodesGroup => ({
    type: FrameNodesActionTypes.FETCH_SUCCESS,
    payload: frameNodesGroup
})

export const fetchFrameNodesFailure = errorMessage => ({
    type: FrameNodesActionTypes.FETCH_FAILURE,
    payload: errorMessage
})

export const saveNewNodeId = (frameId, parentId, newNodeId) => ({
    type: FrameNodesActionTypes.SAVE_NEW_NODE_ID,
    payload: { frameId, parentId, newNodeId }
})

// export const fetchFrameNodesAsync = () => async (dispatch, getState) => {
//     dispatch(fetchFrameNodesStart())

//     try {
//         const workspaceId = selectCurrentWorkspace(getState())

//         const fetchArgs = [workspaceId, 'frame_nodes']

//         const frameNodesGroup = await formatFrameNodesForDispatch(...fetchArgs)

//         dispatch(fetchFrameNodesSuccess(frameNodesGroup))
//     } catch (error) {
//         dispatch(fetchFrameNodesFailure(error.message))
//     }
// }
