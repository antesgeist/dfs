import { createSelector } from 'reselect'

const selectWorkspace = state => state.workspace

export const selectWorkspaces = createSelector(
    [selectWorkspace],
    workspace => workspace.workspaceItems
)
