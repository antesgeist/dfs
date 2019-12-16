import { createSelector } from 'reselect'

const selectFrameNodes = state => state.frameNodes

export const selectFrameNodeGroup = createSelector(
    [selectFrameNodes],
    frameNodes => frameNodes.group
)

export const selectNodesIsFetching = createSelector(
    [selectFrameNodes],
    frameNodes => frameNodes.isFetching
)
