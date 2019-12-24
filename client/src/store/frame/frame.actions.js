import FrameActionTypes from './frame.types'

import { formatFramesForDispatch } from '../store.utils'

import { fetchNodesAsync } from '../node/node.actions'

export const fetchFramesStart = () => ({
    type: FrameActionTypes.FETCH_START
})

export const fetchFramesSuccess = (frameGroups, order) => ({
    type: FrameActionTypes.FETCH_SUCCESS,
    payload: { frameGroups, order }
})

export const fetchFramesFailure = errorMessage => ({
    type: FrameActionTypes.FETCH_SUCCESS,
    payload: errorMessage
})

export const setActiveFrameGroup = frameGroupId => ({
    type: FrameActionTypes.SET_ACTIVE_GROUP,
    payload: frameGroupId
})

export const fetchFramesAsync = frameGroupIds => async dispatch => {
    dispatch(fetchFramesStart())

    try {
        const fetchArgs = [frameGroupIds, 'frames']

        const frameGroups = await formatFramesForDispatch(...fetchArgs)

        dispatch(fetchFramesSuccess(frameGroups, frameGroupIds))

        dispatch(fetchNodesAsync())
    } catch (error) {
        dispatch(fetchFramesFailure(error.message))
    }
}
