import { createContext, useReducer, useEffect } from 'react'
import axios from 'axios'
import { apiUrl } from './constants'
import { ADD_TASK, UPDATE_TASK, REMOVE_TASK, ALL_TASKS } from '../reducers/type'
import { taskReducer } from '../reducers/taskReducer'

export const TaskContext = createContext()

const TaskContextProvider = ({ children }) => {
	const [taskState, dispatch] = useReducer(taskReducer, {
		allTasks: [],
	})

	//get all tasks
	const getAllTask = async () => {
		try {
			const res = await axios.get(`${apiUrl}/task/`)
			if (res.data.success) {
				dispatch({ type: ALL_TASKS, payload: res.data.tasks })
			}
		} catch (error) {
			console.log('error get all task')
			if (error.message) return error.message
			return { success: false, message: error.message }
		}
	}

	useEffect(() => {
		getAllTask()
	}, [])

	//create task
	const createTask = async (taskData) => {
		try {
			const res = await axios.post(`${apiUrl}/task/create/`, taskData)
			if (res.data.success) {
				dispatch({ type: ADD_TASK, payload: res.data.task })
			}
			getAllTask()
			return res.data
		} catch (error) {
			if (error.message) return error.message
			return { success: false, message: error.message }
		}
	}

	//update task
	const updateTask = async (taskData) => {
		const { id, inforTask } = taskData
		try {
			const res = await axios.post(
				`${apiUrl}/task/update/${id}`,
				inforTask
			)
			if (res.data.success) {
				dispatch({ type: UPDATE_TASK, payload: res.data.task })
			}
			return res.data
		} catch (error) {
			if (error.message) return error.message
			return { success: false, message: error.message }
		}
	}

	//delete task
	const deleteTask = async (taskId) => {
		try {
			const res = await axios.delete(`${apiUrl}/task/delete/${taskId}`)
			if (res.data.success) {
				dispatch({ type: REMOVE_TASK, payload: res.data.task })
			}
			return res.data
		} catch (error) {
			if (error.message) return error.message
			return { success: false, message: error.message }
		}
	}

	//context data
	const taskContextData = {
		taskState,
		createTask,
		updateTask,
		deleteTask,
		getAllTask,
	}

	//return
	return (
		<TaskContext.Provider value={taskContextData}>
			{children}
		</TaskContext.Provider>
	)
}

export default TaskContextProvider
