import WorkspaceActionTypes from './workspace.types'
import { workspaces } from '../APP_DATA'

export const fetchWorkspace = () => dispatch =>
    dispatch({
        type: WorkspaceActionTypes.FETCH_WORKSPACE,
        payload: workspaces
    })
