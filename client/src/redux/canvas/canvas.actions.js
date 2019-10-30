import CanvasActionTypes from './canvas.types'
import { frames } from '../APP_DATA'

export const fetchCanvasFrames = () => dispatch =>
    dispatch({
        type: CanvasActionTypes.FETCH_FRAME_DATA,
        payload: frames
    })
