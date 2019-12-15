import { createSelector } from 'reselect'

const selectAuthState = state => state.auth

export const selectCurrentUser = createSelector(
    [selectAuthState],
    auth => auth.currentUser
)

export const selectUserDisplayName = createSelector(
    [selectCurrentUser],
    currentUser => currentUser && currentUser.display_name
)

export const selectIsUserFetching = createSelector(
    [selectAuthState],
    auth => auth.isFetching
)
