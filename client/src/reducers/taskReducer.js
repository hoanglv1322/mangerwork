import { ADD_TASK, UPDATE_TASK, REMOVE_TASK, ALL_TASKS } from './type'

export const taskReducer = (state, action) => {
	const { type, payload } = action

	switch (type) {
		case ALL_TASKS:
			return {
				...state,
				allTasks: payload,
			}
		case ADD_TASK:
			return {
				...state,
				allTasks: [...state.allTasks, payload],
			}
		case REMOVE_TASK:
			return {
				...state,
				allTasks: state.allTasks.filter((task) => task._id !== payload),
			}
		case UPDATE_TASK:
			return {
				...state,
				allTasks: state.allTasks.map((task) => {
					if (task._id === payload._id) {
						return (task = payload)
					} else {
						return task
					}
				}),
			}
		default:
			return state
	}
}
