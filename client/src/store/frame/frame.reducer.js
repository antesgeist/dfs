import produce from 'immer'

import FrameActionTypes from './frame.types'

import { mapNodeStates } from './frame.utils'

const INITIAL_STATE = {
    frameGroups: null,
    activeFrameGroup: null,
    isFetching: false,
    errorMessage: null
}

const frameReducer = (state = INITIAL_STATE, { type, payload }) =>
    produce(state, draft => {
        const { frameGroups, activeFrameGroup } = draft

        switch (type) {
            case FrameActionTypes.FETCH_START:
                draft.isFetching = true
                break

            case FrameActionTypes.FETCH_SUCCESS:
                draft.isFetching = false
                draft.frameGroups = payload
                break

            case FrameActionTypes.FETCH_FAILURE:
                draft.isFetching = false
                draft.errorMessage = payload
                break

            case FrameActionTypes.SET_ACTIVE_GROUP:
                draft.activeFrameGroup = payload
                break
            case FrameActionTypes.TOGGLE_NODE_COLLAPSE:
                draft.frameGroups = mapNodeStates(
                    frameGroups,
                    activeFrameGroup,
                    payload
                )
                break

            /* TOGGLE EVENTS */

            case FrameActionTypes.TOGGLE_NODE_CHECK_ONE:
                draft.frameGroups = mapNodeStates(
                    frameGroups,
                    activeFrameGroup,
                    payload
                )
                break
            case FrameActionTypes.APPEND_TO_PARENT_NODE:
                draft.frameGroups = mapNodeStates(
                    frameGroups,
                    activeFrameGroup,
                    payload
                )
                break

            /* DRAG EVENTS */

            case FrameActionTypes.DRAG_CHILD_NODE:
                draft.frameGroups = mapNodeStates(
                    frameGroups,
                    activeFrameGroup,
                    payload
                )
                break

            default:
                return draft
        }
    })

export default frameReducer
