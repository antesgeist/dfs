import frameActionTypes from './frame.types'

import {
    firestore,
    convertFrameGroupSnapshotToMap
} from '../../firebase/firebase.utils'

// FETCH FRAMES

export const fetchFramesStart = () => ({
    type: frameActionTypes.FETCH_FRAMES_START
})

export const fetchFramesSuccess = frames => ({
    type: frameActionTypes.FETCH_FRAMES_SUCCESS,
    payload: frames
})

export const fetchFramesFailure = errorMessage => ({
    type: frameActionTypes.FETCH_FRAMES_SUCCESS,
    payload: errorMessage
})

export const fetchFramesAsync = (
    activeFramesUID,
    setUnsubscribe
) => dispatch => {
    dispatch(fetchFramesStart())

    const frameGroupRef = firestore
        .collection('frames')
        .doc(activeFramesUID)
        .collection('frameGroup')

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

// TOGGLES

export const toggleNodeCollapse = ({ frameId, nodeId, type }) => ({
    type: frameActionTypes.TOGGLE_NODE_COLLAPSE,
    payload: { frameId, nodeId, type }
})

export const toggleNodeCheck = ({ frameId, nodeId, type }) => ({
    type: frameActionTypes.TOGGLE_NODE_CHECK_ONE,
    payload: { frameId, nodeId, type }
})
