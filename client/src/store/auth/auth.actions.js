import AuthActionTypes from './auth.types'

import {
    auth,
    createUserProfileDocument
} from '../../firebase/firebase.utils'
import { saveUserSnaphot } from '../user/user.actions'
import { formatSnapshotData } from './auth.utils'

// SIGN IN

export const googleSignInStart = () => ({
    type: AuthActionTypes.GOOGLE_SIGN_IN_START
})

export const emailSignInStart = () => ({
    type: AuthActionTypes.EMAIL_SIGN_IN_START
})

export const defaultSignInStart = () => ({
    type: AuthActionTypes.DEFAULT_SIGN_IN_START
})

export const signInSuccess = user => ({
    type: AuthActionTypes.SIGN_IN_SUCCESS,
    payload: user
})

export const signInFailure = error => ({
    type: AuthActionTypes.SIGN_IN_FAILURE,
    payload: error
})

export const setCurrentUserAsync = () => dispatch => {
    dispatch(defaultSignInStart())

    // Begin Firebase Auth
    auth.onAuthStateChanged(async userAuth => {
        if (userAuth) {
            const userRef = await createUserProfileDocument(
                userAuth,
                { display_name: null }
            )

            userRef.onSnapshot(userSnapshot => {
                const userSnapshotObject = formatSnapshotData(
                    userSnapshot.data()
                )

                dispatch(signInSuccess(userSnapshotObject))
                dispatch(saveUserSnaphot(userSnapshotObject))
            })
        }
    })
}

// CHECK USER SESSION

export const checkUserSession = () => ({
    type: AuthActionTypes.CHECK_USER_SESSION
})

// SIGN OUT

export const signOutSuccess = () => ({
    type: AuthActionTypes.SIGN_OUT_SUCCESS
})

export const signOutFailure = error => ({
    type: AuthActionTypes.SIGN_OUT_FAILURE,
    payload: error
})

// SIGN UP

export const signUpStart = userCredentials => ({
    type: AuthActionTypes.SIGN_UP_START,
    payload: userCredentials
})

export const signUpSuccess = ({ user, additionalData }) => ({
    type: AuthActionTypes.SIGN_UP_SUCCESS,
    payload: { user, additionalData }
})

export const signUpFailure = error => ({
    type: AuthActionTypes.SIGN_UP_FAILURE,
    payload: error
})
