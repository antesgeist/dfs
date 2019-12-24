import WorkspaceActionTypes from './workspace.types'

import { formatWorkspaceForDispatch } from '../store.utils'

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

export const fetchWorkspaceAsync = workspaceId => async dispatch => {
    dispatch(fetchWorkspaceStart())

    try {
        const fetchArgs = [workspaceId, 'workspaces', 'panels']

        const {
            group,
            activeItem,
            order,
            nextGroupId
        } = await formatWorkspaceForDispatch(...fetchArgs)

        dispatch(fetchWorkspaceSuccess({ group, activeItem, order }))

        dispatch(fetchPanelsAsync(nextGroupId, workspaceId))
    } catch (error) {
        dispatch(fetchWorkspaceFailure(error.message))
    }
}
