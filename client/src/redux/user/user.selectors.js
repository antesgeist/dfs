import { createSelector } from 'reselect'

const selectUser = state => state.user

export const selectCurrentUser = createSelector(
    [selectUser],
    user => user.currentUser
)

export const selectUserDisplayName = createSelector(
    [selectCurrentUser],
    currentUser => currentUser && currentUser.display_name
)

export const selectIsUserFetching = createSelector(
    [selectUser],
    user => user.isFetching
)
