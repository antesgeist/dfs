import WorkspaceActionTypes from './workspace.types'

import {
    firestore,
    convertWorkspaceGroupSnapshotToMap
} from '../../firebase/firebase.utils'

export const fetchWorkspaceStart = () => ({
    type: WorkspaceActionTypes.FETCH_WORKSPACE_START
})

export const fetchWorkspaceSuccess = workspaceItems => ({
    type: WorkspaceActionTypes.FETCH_WORKSPACE_SUCCESS,
    payload: workspaceItems
})

export const fetchWorkspaceFailure = errorMessage => ({
    type: WorkspaceActionTypes.FETCH_WORKSPACE_FAILURE,
    payload: errorMessage
})

export const fetchWorkspaceAsync = (
    workspaceUID,
    setUnsubscribe
) => dispatch => {
    dispatch(fetchWorkspaceStart())

    const workspaceGroupRef = firestore
        .collection('workspaces')
        .doc(workspaceUID)
        .collection('workspaceItems')

    let unsubscribe = null

    unsubscribe = workspaceGroupRef.onSnapshot(async snapshot => {
        try {
            const workspaceGroup = convertWorkspaceGroupSnapshotToMap(snapshot)
            dispatch(fetchWorkspaceSuccess(workspaceGroup))
            setUnsubscribe(unsubscribe)
        } catch (error) {
            dispatch(fetchWorkspaceFailure(error.message))
        }
    })

    return unsubscribe
}
