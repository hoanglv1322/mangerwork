import {
	ADD_COMMENT,
	UPDATE_COMMENT,
	REMOVE_COMMENT,
	ALL_COMMENTS,
} from './type'

export const commentReducer = (state, action) => {
	const { type, payload } = action

	switch (type) {
		case ALL_COMMENTS:
			return {
				...state,
				allComments: payload,
			}
		case ADD_COMMENT:
			return {
				...state,
				allComments: [...state.allComments, payload],
			}
		case REMOVE_COMMENT:
			return {
				...state,
				allComments: state.allComments.filter(
					(comment) => comment._id !== payload
				),
			}
		case UPDATE_COMMENT:
			return {
				...state,
				allComments: state.allComments.map((comment) => {
					if (comment._id === payload._id) {
						return (comment = payload)
					} else {
						return comment
					}
				}),
			}
		default:
			return state
	}
}
