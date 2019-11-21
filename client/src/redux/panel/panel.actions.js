import PanelActionTypes from './panel.types'

import {
    firestore,
    convertPanelGroupSnapshotToMap
} from '../../firebase/firebase.utils'

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

export const setActivePanel = panelId => ({
    type: PanelActionTypes.SET_ACTIVE,
    payload: panelId
})

export const fetchPanelsAsync = (panelUID, setUnsubscribe) => dispatch => {
    dispatch(fetchPanelsStart())

    const panelsRef = firestore
        .collection('panels')
        .doc(panelUID)
        .collection('panel_group')

    const selectActivePanel = panels =>
        panels
            .filter(({ is_active }) => is_active)
            .reduce((framesUIDString, { id }) => id, '')

    let unsubscribe = null

    unsubscribe = panelsRef.onSnapshot(async snapshot => {
        try {
            const { transformedSnapshotArray } = convertPanelGroupSnapshotToMap(
                snapshot
            )
            const activePanel = selectActivePanel(transformedSnapshotArray)

            dispatch(fetchPanelsSuccess(transformedSnapshotArray))
            dispatch(setActivePanel(activePanel))

            setUnsubscribe(unsubscribe)
        } catch (error) {
            dispatch(fetchPanelsFailure(error.message))
        }
    })

    return unsubscribe
}
