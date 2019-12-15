import AuthActionTypes from './auth.types'

const INITIAL_STATE = {
    currentUser: null,
    isActive: false,
    isLoggedIn: true,
    isFetching: false,
    error: null
}

const authReducer = (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case AuthActionTypes.DEFAULT_SIGN_IN_START:
            return {
                ...state,
                isFetching: true
            }
        case AuthActionTypes.GOOGLE_SIGN_IN_START:
            return {
                ...state,
                isFetching: true
            }
        case AuthActionTypes.EMAIL_SIGN_IN_START:
            return {
                ...state,
                isFetching: true
            }
        case AuthActionTypes.SIGN_IN_SUCCESS:
            return {
                ...state,
                currentUser: payload,
                isFetching: false,
                isActive: true
            }
        case AuthActionTypes.SIGN_OUT_SUCCESS:
            return {
                ...state,
                currentUser: null,
                isActive: false
            }
        case AuthActionTypes.SIGN_IN_FAILURE:
        case AuthActionTypes.SIGN_OUT_FAILURE:
        case AuthActionTypes.SIGN_UP_FAILURE:
            return {
                ...state,
                error: payload
            }
        default:
            return state
    }
}

export default authReducer
