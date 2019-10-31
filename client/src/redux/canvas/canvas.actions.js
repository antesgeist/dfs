import CanvasActionTypes from './canvas.types'

export const fetchCanvasFrames = frames => dispatch =>
    dispatch({
        type: CanvasActionTypes.FETCH_CANVAS_FRAMES,
        payload: frames
    })

export const toggleNodeCollapse = ({ id, type }) => dispatch =>
    dispatch({
        type: CanvasActionTypes.TOGGLE_NODE_COLLAPSE,
        payload: { id, type }
    })

export const toggleNodeCheck = ({ id, type }) => dispatch =>
    dispatch({
        type: CanvasActionTypes.TOGGLE_NODE_CHECK_ONE,
        payload: { id, type }
    })
