import CanvasActionTypes from './canvas.types'

export const fetchCanvasFrames = framesObject => dispatch =>
    dispatch({
        type: CanvasActionTypes.FETCH_CANVAS_FRAMES,
        payload: framesObject
    })

export const toggleFrameNodeView = nodeId => ({
    type: CanvasActionTypes.TOGGLE_FRAME_NODE_VIEW,
    payload: nodeId
})

export const foundIt = () => ({
    type: CanvasActionTypes.FOUND
})
