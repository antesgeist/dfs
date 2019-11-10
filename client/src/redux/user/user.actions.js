import UserActionTypes from './user.types'
import { auth, createUserProfileDocument } from '../../firebase/firebase.utils'

// SIGN IN

export const googleSignInStart = () => ({
    type: UserActionTypes.GOOGLE_SIGN_IN_START
})

export const emailSignInStart = () => ({
    type: UserActionTypes.EMAIL_SIGN_IN_START
})

export const defaultSignInStart = () => ({
    type: UserActionTypes.DEFAULT_SIGN_IN_START
})

export const signInSuccess = user => ({
    type: UserActionTypes.SIGN_IN_SUCCESS,
    payload: user
})

export const signInFailure = error => ({
    type: UserActionTypes.SIGN_IN_FAILURE,
    payload: error
})

export const setCurrentUserAsync = () => dispatch => {
    dispatch(defaultSignInStart())

    // Begin Firebase Auth
    auth.onAuthStateChanged(async userAuth => {
        if (userAuth) {
            const userRef = await createUserProfileDocument(userAuth)

            userRef.onSnapshot(snapShot => {
                dispatch(
                    signInSuccess({
                        id: snapShot.id,
                        ...snapShot.data()
                    })
                )
            })
        }
    })
}

// CHECK USER SESSION

export const checkUserSession = () => ({
    type: UserActionTypes.CHECK_USER_SESSION
})

// SIGN OUT

export const signOutStart = () => ({
    type: UserActionTypes.SIGN_OUT_START
})

export const signOutSuccess = () => ({
    type: UserActionTypes.SIGN_OUT_SUCCESS
})

export const signOutFailure = error => ({
    type: UserActionTypes.SIGN_OUT_FAILURE,
    payload: error
})

// SIGN UP

export const signUpStart = userCredentials => ({
    type: UserActionTypes.SIGN_UP_START,
    payload: userCredentials
})

export const signUpSuccess = ({ user, additionalData }) => ({
    type: UserActionTypes.SIGN_UP_SUCCESS,
    payload: { user, additionalData }
})

export const signUpFailure = error => ({
    type: UserActionTypes.SIGN_UP_FAILURE,
    payload: error
})
