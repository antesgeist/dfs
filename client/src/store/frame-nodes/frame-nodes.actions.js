import FrameNodesActionTypes from './frame-nodes.types'

import { formatFrameNodesForDispatch } from '../store.utils'

import { fetchNodesAsync } from '../node/node.actions'

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

export const fetchFrameNodesAsync = frameNodesIds => async dispatch => {
    dispatch(fetchFrameNodesStart())

    try {
        const fetchArgs = [frameNodesIds, 'frame_nodes']

        const frameNodesGroup = await formatFrameNodesForDispatch(...fetchArgs)

        dispatch(fetchFrameNodesSuccess(frameNodesGroup))

        dispatch(fetchNodesAsync())
    } catch (error) {
        dispatch(fetchFrameNodesFailure(error.message))
    }
}
