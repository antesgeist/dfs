import WorkspaceActionTypes from './workspace.types'
import { workspacesDB } from '../APP_DATA'

const getWorkspace = (db, workspaceUID) => {
    // do async stuff...
    const workspaces = db[workspaceUID]
    return workspaces
}

export const fetchWorkspaceStart = () => ({
    type: WorkspaceActionTypes.FETCH_WORKSPACE_START
})

export const fetchWorkspaceSuccess = workspaceItems => ({
    type: WorkspaceActionTypes.FETCH_WORKSPACE_SUCCESS,
    payload: workspaceItems
})

export const fetchWorkspaceAsync = () => dispatch => {
    const workspaceItems = getWorkspace(workspacesDB, 'userworkspace1')

    dispatch(fetchWorkspaceStart())
    dispatch(fetchWorkspaceSuccess(workspaceItems))
}
