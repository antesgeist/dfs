import frameActionTypes from './frame.types'

import {
    firestore,
    convertFrameGroupSnapshotToMap
} from '../../firebase/firebase.utils'

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

export const fetchFramesAsync = (
    activeFramesUID,
    setUnsubscribe
) => dispatch => {
    dispatch(fetchFramesStart())

    const frameGroupRef = firestore
        .collection('frames')
        .doc(activeFramesUID)
        .collection('frame_group')

    let unsubscribe = null

    unsubscribe = frameGroupRef.onSnapshot(async snapshot => {
        try {
            const frameGroup = convertFrameGroupSnapshotToMap(snapshot)
            dispatch(fetchFramesSuccess(frameGroup))
            setUnsubscribe(unsubscribe)
        } catch (error) {
            dispatch(fetchFramesFailure(error.message))
        }
    })
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
