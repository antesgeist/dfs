import UserActionTypes from './user.types'

const INITIAL_STATE = {
    currentUser: null,
    error: null,
    isFetching: false
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UserActionTypes.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload
            }
        case UserActionTypes.GOOGLE_SIGN_IN_START:
            return {
                ...state,
                isFetching: true
            }
        case UserActionTypes.EMAIL_SIGN_IN_START:
            return {
                ...state,
                isFetching: true
            }
        case UserActionTypes.DEFAULT_SIGN_IN_START:
            return {
                ...state,
                isFetching: true
            }
        case UserActionTypes.SIGN_IN_SUCCESS:
            return {
                ...state,
                currentUser: action.payload,
                isFetching: false
            }
        case UserActionTypes.SIGN_OUT_SUCCESS:
            return {
                ...state,
                currentUser: null
            }
        case UserActionTypes.SIGN_IN_FAILURE:
        case UserActionTypes.SIGN_OUT_FAILURE:
        case UserActionTypes.SIGN_UP_FAILURE:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state
    }
}

export default userReducer
