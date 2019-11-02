import { createSelector } from 'reselect'

const selectFrames = state => state.frames

export const selectCanvasFrames = createSelector(
    [selectFrames],
    frames => frames.canvasFrames
)
