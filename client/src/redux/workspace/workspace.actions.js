import WorkspaceActionTypes from './workspace.types'

import {
    firestore,
    formatWorkspaceSnapshot
} from '../../firebase/firebase.utils'

import { fetchPanelsAsync } from '../panel/panel.actions'

export const fetchWorkspaceStart = () => ({
    type: WorkspaceActionTypes.FETCH_START
})

export const fetchWorkspaceSuccess = workspaces => ({
    type: WorkspaceActionTypes.FETCH_SUCCESS,
    payload: workspaces
})

export const fetchWorkspaceFailure = errorMessage => ({
    type: WorkspaceActionTypes.FETCH_START,
    payload: errorMessage
})

export const fetchWorkspaceAsync = (
    workspaceId,
    panelsId,
    setUnsubFromWorkspace,
    setUnsubFromPanels
) => dispatch => {
    dispatch(fetchWorkspaceStart())

    const workspaceRef = firestore
        .collection('workspaces')
        .doc(workspaceId)
        .collection('workspace_group')
        .where('is_active', '==', true)

    let unsubscribe = null

    unsubscribe = workspaceRef.onSnapshot(async snapshot => {
        try {
            const panelGroups = formatWorkspaceSnapshot(snapshot)

            // 1 - fetch workspace panels
            dispatch(fetchWorkspaceSuccess(panelGroups))

            // 2 - fetch panel where panel = workspace panels
            dispatch(
                fetchPanelsAsync(panelsId, panelGroups, setUnsubFromPanels)
            )

            // 3 - select active panel
            const panelId =
                // 4 - fetch

                setUnsubFromWorkspace(unsubscribe)
        } catch (error) {
            dispatch(fetchWorkspaceFailure(error.message))
        }
    })

    return unsubscribe
}
