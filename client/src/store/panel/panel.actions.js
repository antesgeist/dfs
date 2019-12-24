import PanelActionTypes from './panel.types'

import { formatPanelsForDispatch } from '../store.utils'

import { setActiveFrameGroup, fetchFramesAsync } from '../frame/frame.actions'

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

export const setActivePanel = panelId => dispatch => {
    dispatch({
        type: PanelActionTypes.SET_ACTIVE,
        payload: panelId
    })

    // dispatch(setActiveFrameGroup(framesId))
}

export const fetchPanelsAsync = panelGroupId => async dispatch => {
    dispatch(fetchPanelsStart())

    try {
        const fetchArgs = [panelGroupId, 'panels', 'frames']

        const {
            group,
            activeItem,
            order,
            frameGroupIds
        } = await formatPanelsForDispatch(...fetchArgs)

        dispatch(fetchPanelsSuccess({ group, activeItem, order }))

        dispatch(fetchFramesAsync(frameGroupIds))
    } catch (error) {
        dispatch(fetchPanelsFailure(error))
    }
}
