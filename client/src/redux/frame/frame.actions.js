import frameActionTypes from './frame.types'
import { framesDB } from '../APP_DATA'

const getFrames = (db, framesUID) => {
    // do async stuff...
    const workspaces = db[framesUID]
    return workspaces
}

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

export const fetchFramesAsync = () => dispatch => {
    const frames = getFrames(framesDB, 'framesUID1')

    dispatch(fetchFramesStart())
    dispatch(fetchFramesSuccess(frames))
}

export const toggleNodeCollapse = ({ frameId, nodeId, type }) => ({
    type: frameActionTypes.TOGGLE_NODE_COLLAPSE,
    payload: { frameId, nodeId, type }
})

export const toggleNodeCheck = ({ frameId, nodeId, type }) => ({
    type: frameActionTypes.TOGGLE_NODE_CHECK_ONE,
    payload: { frameId, nodeId, type }
})
