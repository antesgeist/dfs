import UserActionTypes from './user.types'

const INITIAL_STATE = {
    keys: {},
    ids: []
}

const userReducer = (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case UserActionTypes.SAVE_USER_SNAPSHOT: {
            const { id } = payload

            return {
                ...state,
                keys: {
                    ...state.keys,
                    [id]: payload
                },
                ids: [...state.ids, id]
            }
        }
        default:
            return state
    }
}

export default userReducer
