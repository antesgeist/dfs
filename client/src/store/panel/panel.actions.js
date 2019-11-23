import PanelActionTypes from './panel.types'

import { firestore } from '../../firebase/firebase.utils'
import { transformPanelSnapshot } from './panel.utils'

import { setActiveFrameGroup } from '../frame/frame.actions'

export const fetchPanelsStart = () => ({
    type: PanelActionTypes.FETCH_START
})

export const fetchPanelsSuccess = panels => ({
    type: PanelActionTypes.FETCH_SUCCESS,
    payload: panels
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

export const fetchPanelsAsync = (
    panelId,
    panelFilter,
    setUnsubscribe
) => dispatch => {
    dispatch(fetchPanelsStart())

    const panelsRef = firestore
        .collection('panels')
        .doc(panelId)
        .collection('panel_group')

    const selectActivePanel = panels =>
        panels
            .filter(({ is_active }) => is_active)
            .reduce((activeIds, { id, frames_uid }) => {
                return { id, frames_uid }
            }, {})

    let unsubscribe = null

    unsubscribe = panelsRef.onSnapshot(async snapshot => {
        try {
            const transformedSnapshot = transformPanelSnapshot(
                snapshot,
                panelFilter
            )

            const { id, frames_uid } = selectActivePanel(transformedSnapshot)

            dispatch(fetchPanelsSuccess(transformedSnapshot))
            dispatch(setActivePanel(id, frames_uid))

            setUnsubscribe(unsubscribe)
        } catch (error) {
            dispatch(fetchPanelsFailure(error.message))
        }
    })

    return unsubscribe
}
