import { createSelector } from 'reselect'

const selectNodes = state => state.nodes

export const selectNodeGroup = createSelector(
    [selectNodes],
    nodes => nodes.group
)

export const selectNodesIsFetching = createSelector(
    [selectNodeGroup],
    nodes => nodes.isFetching
)
