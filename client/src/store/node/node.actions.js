import NodeActionTypes from './node.types'

import { selectCurrentWorkspace } from '../auth/auth.selectors'
import { firestore } from '../../firebase/firebase.utils'

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

    const formatGroupSnapshots = snapshot =>
        snapshot.docs.reduce((cur, doc) => {
            const { id } = doc.data()
            return { ...cur, [id]: doc.data() }
        }, {})

    const formatNodeSnapshotForDispatch = async curWorkspaceId => {
        const nodeGroupSnapshots = await firestore
            .collection('workspaces')
            .doc(curWorkspaceId)
            .collection('nodes')
            .get()

        return formatGroupSnapshots(nodeGroupSnapshots)
    }

    try {
        const state = getState()
        const currentWorkspaceId = selectCurrentWorkspace(state)

        const nodeGroup = await formatNodeSnapshotForDispatch(
            currentWorkspaceId
        )

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

export const appendNewNode = ({ frameId, parentId, nodeId, type }) => ({
    type: NodeActionTypes.APPEND_TO_PARENT_NODE,
    payload: { frameId, parentId, nodeId, type }
})

export const appendChildNode = ({ frameId, nodeId, type }) => ({
    type: NodeActionTypes.APPEND_CHILD_NODE,
    payload: { frameId, nodeId, type }
})
