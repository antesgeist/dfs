import CanvasActionTypes from './canvas.types'

const INITIAL_STATE = {
    canvasFrames: []
}

const canvasReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CanvasActionTypes.FETCH_FRAME_DATA:
            return {
                ...state,
                canvasFrames: action.payload
            }
        default:
            return state
    }
}

export default canvasReducer
