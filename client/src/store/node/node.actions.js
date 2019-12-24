import nanoid from 'nanoid'

import NodeActionTypes from './node.types'

import { selectCurrentWorkspace } from '../auth/auth.selectors'
import { firestore } from '../../firebase/firebase.utils'
import {
    saveNewNodeId,
    fetchFrameNodesSuccess
} from '../frame-nodes/frame-nodes.actions'
import { formatNodesForDispatch } from '../store.utils'

export const fetchNodesStart = () => ({
    type: NodeActionTypes.FETCH_START
})

export const fetchNodesSuccess = nodeGroup => ({
    type: NodeActionTypes.FETCH_SUCCESS,
    payload: nodeGroup
})

export const fetchNodesFailure = error => ({
    type: NodeActionTypes.FETCH_FAILURE,
    payload: error
})

export const fetchNodesAsync = () => async (dispatch, getState) => {
    dispatch(fetchNodesStart())

    try {
        const workspaceId = selectCurrentWorkspace(getState())

        // fetch frameNodes by workspace
        const frameNodesSnapshot = await firestore
            .collection('nodes')
            .where('workspace_id', '==', workspaceId)
            .get()

        // format nodes snapshots
        const frameNodesArray = frameNodesSnapshot.docs.map(doc => doc.data())

        const { nodeGroup, frameNodes } = formatNodesForDispatch(
            frameNodesArray
        )

        dispatch(fetchFrameNodesSuccess(frameNodes))

        dispatch(fetchNodesSuccess(nodeGroup))
    } catch (error) {
        dispatch(fetchNodesFailure(error))
    }
}

/* EVENT: TOGGLE */

export const toggleNodeCollapse = ({ frameId, nodeId, type }) => ({
    type: NodeActionTypes.TOGGLE_NODE_COLLAPSE,
    payload: { frameId, nodeId, type, action: 'TOGGLE_NODE_COLLAPSE' }
})

export const toggleNodeCheck = ({ frameId, nodeId, type }) => ({
    type: NodeActionTypes.TOGGLE_NODE_CHECK_ONE,
    payload: { frameId, nodeId, type }
})

/* EVENT: DRAG */

export const dragChildNode = ({ frameId, parentId, nodeIndexMap, type }) => ({
    type: NodeActionTypes.DRAG_CHILD_NODE,
    payload: { frameId, parentId, nodeIndexMap, type }
})

/* EVENT: APPEND/ADD */

const createNewNode = newNodeId => ({
    title: `New Node: ${Math.floor(Math.random() * 100)}`,
    state: {
        checked: false,
        collapsed: false
    },
    id: newNodeId,
    descendant: []
})

export const appendNewNode = ({ frameId, parentId, nodeId }) => dispatch => {
    // save new node
    const newNodeId = nanoid()
    dispatch(saveNewNodeId(frameId, parentId, newNodeId))

    dispatch({
        type: NodeActionTypes.APPEND_TO_PARENT_NODE,
        payload: {
            parentId,
            nodeId,
            newNode: createNewNode(newNodeId),
            newNodeId
        }
    })
}

export const appendChildNode = ({ frameId, nodeId, type }) => ({
    type: NodeActionTypes.APPEND_CHILD_NODE,
    payload: { frameId, nodeId, type }
})
