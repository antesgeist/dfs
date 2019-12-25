import nanoid from 'nanoid'

import NodeActionTypes from './node.types'

import { selectCurrentWorkspace } from '../auth/auth.selectors'
import { firestore } from '../../firebase/firebase.utils'

import { formatNodesForDispatch } from '../store.utils'

export const fetchNodesStart = () => ({
    type: NodeActionTypes.FETCH_START
})

export const fetchNodesSuccess = (frameNodes, nodeGroup) => ({
    type: NodeActionTypes.FETCH_SUCCESS,
    payload: { frameNodes, nodeGroup }
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

        dispatch(fetchNodesSuccess(frameNodes, nodeGroup))
    } catch (error) {
        dispatch(fetchNodesFailure(error))
    }
}

/* EVENT: COLLAPSE */

export const toggleNodeCollapse = ({ parentId, event }) => ({
    type: NodeActionTypes.TOGGLE_NODE_COLLAPSE,
    payload: { parentId, event }
})

/* EVENT: CHECK */

export const toggleNodeCheck = ({ nodeId, event }) => ({
    type: NodeActionTypes.TOGGLE_NODE_CHECK_ONE,
    payload: { nodeId, event }
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

export const appendNewNode = ({ frameId, parentId }) => dispatch => {
    const newNodeId = nanoid()
    const newNode = createNewNode(newNodeId)

    dispatch({
        type: NodeActionTypes.APPEND_TO_PARENT_NODE,
        payload: {
            frameId,
            parentId,
            newNodeId,
            newNode
        }
    })
}

export const appendChildNode = ({ frameId, nodeId }) => dispatch => {
    const newNodeId = nanoid()
    const newNode = createNewNode(newNodeId)

    dispatch({
        type: NodeActionTypes.APPEND_CHILD_NODE,
        payload: {
            frameId,
            nodeId,
            newNodeId,
            newNode
        }
    })
}
