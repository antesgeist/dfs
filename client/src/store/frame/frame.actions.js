import FrameActionTypes from './frame.types'

import { firestore } from '../../firebase/firebase.utils'
import { fetchSubCollectionsByDocIds } from './frame.utils'

/* Fetch Frames */

export const fetchFramesStart = () => ({
    type: FrameActionTypes.FETCH_START
})

export const fetchFramesSuccess = frameGroups => ({
    type: FrameActionTypes.FETCH_SUCCESS,
    payload: frameGroups
})

export const fetchFramesFailure = errorMessage => ({
    type: FrameActionTypes.FETCH_SUCCESS,
    payload: errorMessage
})

export const setActiveFrameGroup = frameGroupId => ({
    type: FrameActionTypes.SET_ACTIVE_GROUP,
    payload: frameGroupId
})

export const fetchFramesAsync = framesFilter => dispatch => {
    dispatch(fetchFramesStart())

    const fetchProps = [firestore, framesFilter, 'frames', 'frame_group']

    fetchSubCollectionsByDocIds(...fetchProps)
        .then(frameGroups => {
            dispatch(fetchFramesSuccess(frameGroups))
        })
        .catch(error => dispatch(fetchFramesFailure(error.message)))
}

/* TOGGLES */

export const toggleNodeCollapse = ({ frameId, nodeId, type }) => ({
    type: FrameActionTypes.TOGGLE_NODE_COLLAPSE,
    payload: { frameId, nodeId, type }
})

export const toggleNodeCheck = ({ frameId, nodeId, type }) => ({
    type: FrameActionTypes.TOGGLE_NODE_CHECK_ONE,
    payload: { frameId, nodeId, type }
})

/* ADD NEW NODE */

export const appendNewNode = ({ frameId, parentId, nodeId, type }) => ({
    type: FrameActionTypes.APPEND_NEW_NODE,
    payload: { frameId, parentId, nodeId, type }
})

/* DRAG NODES */

export const dragChildNode = ({ frameId, parentId, nodeIndexMap, type }) => ({
    type: FrameActionTypes.DRAG_CHILD_NODE,
    payload: { frameId, parentId, nodeIndexMap, type }
})
