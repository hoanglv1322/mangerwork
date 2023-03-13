import {
	ADD_MESSAGER,
	UPDATE_MESSAGER,
	REMOVE_MESSAGER,
	ALL_MESSAGERS,
} from './type'

export const messagerReducer = (state, action) => {
	const { type, payload } = action

	switch (type) {
		case ALL_MESSAGERS:
			return {
				...state,
				allMessagers: payload,
			}
		case ADD_MESSAGER:
			return {
				...state,
				allComments: [...state.allMessagers, payload],
			}
		case REMOVE_MESSAGER:
			return {
				...state,
				allMessagers: state.allMessagers.filter(
					(messager) => messager._id !== payload
				),
			}
		case UPDATE_MESSAGER:
			return {
				...state,
				allMessagers: state.allMessagers.map((messager) => {
					if (messager._id === payload._id) {
						return (messager = payload)
					} else {
						return messager
					}
				}),
			}
		default:
			return state
	}
}
