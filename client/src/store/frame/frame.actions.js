import frameActionTypes from './frame.types'

import { firestore } from '../../firebase/firebase.utils'
import { fetchSubCollectionsByDocIds } from './frame.utils'

/* Fetch Frames */

export const fetchFramesStart = () => ({
    type: frameActionTypes.FETCH_START
})

export const fetchFramesSuccess = frameGroups => ({
    type: frameActionTypes.FETCH_SUCCESS,
    payload: frameGroups
})

export const fetchFramesFailure = errorMessage => ({
    type: frameActionTypes.FETCH_SUCCESS,
    payload: errorMessage
})

export const setActiveFrameGroup = frameGroupId => ({
    type: frameActionTypes.SET_ACTIVE_GROUP,
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
    type: frameActionTypes.TOGGLE_NODE_COLLAPSE,
    payload: { frameId, nodeId, type }
})

export const toggleNodeCheck = ({ frameId, nodeId, type }) => ({
    type: frameActionTypes.TOGGLE_NODE_CHECK_ONE,
    payload: { frameId, nodeId, type }
})
