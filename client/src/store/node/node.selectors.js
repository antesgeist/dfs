import { createSelector } from 'reselect'

const selectNodes = state => state.nodes

export const selectNodeGroup = createSelector(
    [selectNodes],
    nodes => nodes.groupByNodes
)

export const selectFrameNodes = createSelector(
    [selectNodes],
    nodes => nodes.groupByFrames
)

export const selectNodesIsFetching = createSelector(
    [selectNodeGroup],
    nodes => nodes.isFetching
)
