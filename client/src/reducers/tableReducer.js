import { ADD_TABLE, UPDATE_TABLE, REMOVE_TABLE, ALL_TABLES } from './type'

export const tableReducer = (state, action) => {
	const { type, payload } = action

	switch (type) {
		case ALL_TABLES:
			return {
				...state,
				tables: payload,
			}
		case ADD_TABLE:
			return {
				...state,
				tables: [...state.tables, payload],
			}
		case REMOVE_TABLE:
			return {
				...state,
				tables: state.tables.filter((table) => table._id !== payload),
			}
		case UPDATE_TABLE:
			return {
				...state,
				tables: state.tables.map((table) => {
					if (table._id === payload._id) {
						return (table = payload)
					} else {
						return table
					}
				}),
			}
		default:
			return state
	}
}
