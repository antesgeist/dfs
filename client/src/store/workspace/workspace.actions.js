import WorkspaceActionTypes from './workspace.types'

import { formatSnapshotsForDispatch } from '../store.utils'

import { fetchPanelsAsync } from '../panel/panel.actions'

export const fetchWorkspaceStart = () => ({
    type: WorkspaceActionTypes.FETCH_START
})

export const fetchWorkspaceSuccess = workspaceFields => ({
    type: WorkspaceActionTypes.FETCH_SUCCESS,
    payload: workspaceFields
})

export const fetchWorkspaceFailure = errorMessage => ({
    type: WorkspaceActionTypes.FETCH_START,
    payload: errorMessage
})

export const fetchWorkspaceAsync = workspaceGroupId => async dispatch => {
    dispatch(fetchWorkspaceStart())

    try {
        const fetchArgs = [workspaceGroupId, 'workspaces', 'panels']

        const {
            group,
            activeItem,
            order,
            nextGroupId
        } = await formatSnapshotsForDispatch(...fetchArgs)

        dispatch(fetchWorkspaceSuccess({ group, activeItem, order }))

        dispatch(fetchPanelsAsync(nextGroupId))
    } catch (error) {
        dispatch(fetchWorkspaceFailure(error.message))
    }
}
