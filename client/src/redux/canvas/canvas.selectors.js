import { createSelector } from 'reselect'

const selectCanvas = state => state.canvas

export const selectCanvasFrames = createSelector(
    [selectCanvas],
    canvas => canvas.canvasFrames
)
