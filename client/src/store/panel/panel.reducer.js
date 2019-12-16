import PanelActionTypes from './panel.types'

const INITIAL_STATE = {
    group: null,
    activeItem: null,
    order: null,
    isFetching: false,
    errorMessage: null
}

const panelReducer = (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case PanelActionTypes.FETCH_START:
            return {
                ...state,
                isFetching: true
            }
        case PanelActionTypes.FETCH_SUCCESS:
            /* payload = { group, activeItem, order} */
            return {
                ...state,
                ...payload,
                isFetching: false
            }
        case PanelActionTypes.FETCH_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessage: payload
            }
        case PanelActionTypes.SET_ACTIVE:
            return {
                ...state,
                activePanel: payload
            }
        default:
            return state
    }
}

export default panelReducer
