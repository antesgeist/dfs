import produce from 'immer'

import FrameActionTypes from './frame.types'

const INITIAL_STATE = {
    frameGroups: null,
    activeItem: null,
    order: null,
    isFetching: false,
    errorMessage: null
}

const frameReducer = (state = INITIAL_STATE, { type, payload }) =>
    produce(state, draft => {
        switch (type) {
            case FrameActionTypes.FETCH_START:
                draft.isFetching = true
                break

            case FrameActionTypes.FETCH_SUCCESS: {
                const { frameGroups, order } = payload

                draft.isFetching = false
                draft.frameGroups = frameGroups
                draft.order = order
                break
            }

            case FrameActionTypes.FETCH_FAILURE:
                draft.isFetching = false
                draft.errorMessage = payload
                break

            case FrameActionTypes.SET_ACTIVE_GROUP:
                draft.activeItem = payload
                break

            default:
                return draft
        }
    })

export default frameReducer
