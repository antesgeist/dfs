import UserActionTypes from './user.types'

export const saveUserSnaphot = snapshot => ({
    type: UserActionTypes.SAVE_USER_SNAPSHOT,
    payload: snapshot
})
