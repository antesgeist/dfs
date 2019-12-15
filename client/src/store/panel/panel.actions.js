import PanelActionTypes from './panel.types'

import { formatSnapshotsForDispatch } from '../store.utils'

import {
    setActiveFrameGroup,
    fetchFramesAsync
} from '../frame/frame.actions'

export const fetchPanelsStart = () => ({
    type: PanelActionTypes.FETCH_START
})

export const fetchPanelsSuccess = panelStates => ({
    type: PanelActionTypes.FETCH_SUCCESS,
    payload: panelStates
})

export const fetchPanelsFailure = errorMessage => ({
    type: PanelActionTypes.FETCH_FAILURE,
    payload: errorMessage
})

export const setActivePanel = (panelId, framesId) => dispatch => {
    dispatch({
        type: PanelActionTypes.SET_ACTIVE,
        payload: panelId
    })

    dispatch(setActiveFrameGroup(framesId))
}

export const fetchPanelsAsync = panelGroupId => async dispatch => {
    dispatch(fetchPanelsStart())

    try {
        const formatArgs = [panelGroupId, 'panels', 'frames']
        const panelSnapshots = await formatSnapshotsForDispatch(
            ...formatArgs
        )

        const {
            group,
            activeGroupId,
            order,
            nextGroupId
        } = panelSnapshots

        dispatch(fetchPanelsSuccess({ group, activeGroupId, order }))

        dispatch(fetchFramesAsync(nextGroupId))
    } catch (error) {
        dispatch(fetchPanelsFailure(error))
    }
}
