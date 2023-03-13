import {
	ADD_WORKPLACE,
	REMOVE_WORKPLACE,
	UPDATE_WORKPLACE,
	ALL_WORKPLACES,
} from './type'

export const workPlaceReducer = (state, action) => {
	const { type, payload } = action

	switch (type) {
		case ALL_WORKPLACES:
			return {
				...state,
				workPlaces: payload,
			}
		case ADD_WORKPLACE:
			return {
				...state,
				workPlaces: [...state.workPlaces, payload],
			}
		case REMOVE_WORKPLACE:
			return {
				...state,
				workPlaces: state.workPlaces.filter(
					(workPalce) => workPalce._id !== payload
				),
			}
		case UPDATE_WORKPLACE:
			return {
				...state,
				workPlaces: state.workPlaces.map((workPalce) => {
					if (workPalce._id === payload._id) {
						return (workPalce = payload)
					} else {
						return workPalce
					}
				}),
			}
		default:
			return state
	}
}
