import {
	ADD_CARD,
	UPDATE_CARD,
	REMOVE_CARD,
	ALL_CARDS,
	ADD_CARD_CSV,
} from './type'

export const cardReducer = (state, action) => {
	const { type, payload } = action

	switch (type) {
		case ALL_CARDS:
			return {
				...state,
				allCards: payload,
			}
		case ADD_CARD:
			return {
				...state,
				allCards: [...state.allCards, payload],
			}
		case ADD_CARD_CSV:
			return {
				...state,
				allCards: [...state.allCards, ...payload],
			}
		case REMOVE_CARD:
			return {
				...state,
				allCards: state.allCards.filter((card) => card._id !== payload),
			}
		case UPDATE_CARD:
			return {
				...state,
				allCards: state.allCards.map((card) => {
					if (card._id === payload._id) {
						return (card = payload)
					} else {
						return card
					}
				}),
			}
		default:
			return state
	}
}
