import { createSelector } from 'reselect'

const selectAuthState = state => state.auth

export const selectCurrentUser = createSelector(
    [selectAuthState],
    auth => auth.currentUser
)

export const selectCurrentWorkspace = createSelector(
    [selectCurrentUser],
    currentUser => currentUser.workspaces
)

export const selectUserDisplayName = createSelector(
    [selectCurrentUser],
    currentUser => currentUser && currentUser.displayName
)

export const selectIsUserFetching = createSelector(
    [selectAuthState],
    auth => auth.isFetching
)
