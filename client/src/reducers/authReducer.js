import { SET_AUTH, LOGOUT, UPDATE_USER, ALL_USER, CREATE_USER } from './type'

export const authReducer = (state, action) => {
	const {
		type,
		payload: { isAuthenticated, user, allAccounts },
	} = action

	switch (type) {
		case SET_AUTH:
			return {
				...state,
				isAuthenticated,
				user,
			}
		case LOGOUT:
			return {
				...state,
				isAuthenticated,
				user,
			}
		case UPDATE_USER: {
			return {
				...state,
				user,
				allUsers: state.allUsers.map((account) => {
					if (account._id === user._id) {
						return (account = user)
					} else {
						return account
					}
				}),
			}
		}
		case ALL_USER: {
			return {
				...state,
				allUsers: allAccounts,
			}
		}
		case CREATE_USER: {
			return {
				...state,
				user,
			}
		}
		default:
			return state
	}
}
