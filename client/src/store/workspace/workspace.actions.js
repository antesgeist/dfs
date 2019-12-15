import WorkspaceActionTypes from './workspace.types'

import { firestore } from '../../firebase/firebase.utils'
import { formatWorkspaceSnapshot } from './workspace.utils'
import { formatSnapshotsForDispatch } from '../store.utils'

import { fetchPanelsAsync } from '../panel/panel.actions'

export const fetchWorkspaceStart = () => ({
    type: WorkspaceActionTypes.FETCH_START
})

export const fetchWorkspaceSuccess = workspaceGroups => ({
    type: WorkspaceActionTypes.FETCH_SUCCESS,
    payload: workspaceGroups
})

export const fetchWorkspaceFailure = errorMessage => ({
    type: WorkspaceActionTypes.FETCH_START,
    payload: errorMessage
})

export const fetchWorkspaceAsync = workspaceGroupId => async dispatch => {
    dispatch(fetchWorkspaceStart())

    try {
        const formatArgs = [workspaceGroupId, 'workspaces', 'panels']

        const workspaceSnapshots = await formatSnapshotsForDispatch(
            ...formatArgs
        )

        const {
            group,
            activeGroupId,
            order,
            nextGroupId
        } = workspaceSnapshots

        /* WORKSPACE */
        dispatch(
            fetchWorkspaceSuccess({ group, activeGroupId, order })
        )

        /* PANELS */
        dispatch(fetchPanelsAsync(nextGroupId))
    } catch (error) {
        dispatch(fetchWorkspaceFailure(error.message))
    }
}
