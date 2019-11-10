import { createSelector } from 'reselect'

const selectWorkspace = state => state.workspace

export const selectWorkspaces = createSelector(
    [selectWorkspace],
    workspace => workspace.workspaceItems
)

export const selectIsWorkspaceFetching = createSelector(
    [selectWorkspace],
    workspace => workspace.isFetching
)

export const selectActiveFramesUID = createSelector(
    [selectWorkspaces],
    workspaceItems =>
        workspaceItems &&
        workspaceItems
            .filter(workspace => workspace.isActive)
            .reduce((framesUIDString, { framesUID }) => framesUID, '')
)
