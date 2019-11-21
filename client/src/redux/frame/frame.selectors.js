import { createSelector } from 'reselect'

const selectFrames = state => state.frames

export const selectFrameGroup = createSelector(
    [selectFrames],
    frames => frames.frameGroups
)

export const selectIsFramesFetching = createSelector(
    [selectFrames],
    frames => frames.isFetching
)
