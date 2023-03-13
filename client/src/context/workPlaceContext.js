import { createContext, useReducer, useEffect } from 'react'
import axios from 'axios'
import { apiUrl } from './constants'
import {
	ADD_WORKPLACE,
	REMOVE_WORKPLACE,
	UPDATE_WORKPLACE,
	ALL_WORKPLACES,
} from '../reducers/type'
import { workPlaceReducer } from '../reducers/workPlaceReducer'

export const WorkPlaceContext = createContext()

const WorkPlaceContextProvider = ({ children }) => {
	const [workPlaceState, dispatch] = useReducer(workPlaceReducer, {
		workPlaces: [],
	})

	//get all workPlace
	const getAllWorkPlaces = async () => {
		try {
			const res = await axios.get(`${apiUrl}/workplace/`)
			if (res.data.success) {
				dispatch({ type: ALL_WORKPLACES, payload: res.data.workPlaces })
			}
		} catch (error) {
			if (error.message) return error.message
			return { success: false, message: error.message }
		}
	}

	useEffect(() => {
		getAllWorkPlaces()
	}, [])

	//create workPlace
	const createWorkPlace = async (workPlaceData) => {
		try {
			const res = await axios.post(
				`${apiUrl}/workplace/create`,
				workPlaceData
			)
			if (res.data.success) {
				dispatch({ type: ADD_WORKPLACE, payload: res.data.workPalce })
			}
			return res.data
		} catch (error) {
			if (error.message) return error.message
			return { success: false, message: error.message }
		}
	}

	//update workPlace
	const updateWorkPlace = async (workPlaceData) => {
		const { id, isAddMember, workPlaceInfor } = workPlaceData
		try {
			const res = await axios.post(
				`${apiUrl}/workplace/update/${id}/${isAddMember}`,
				workPlaceInfor
			)
			if (res.data.success) {
				dispatch({
					type: UPDATE_WORKPLACE,
					payload: res.data.workPlace,
				})
			}
			return res.data
		} catch (error) {
			if (error.message) return error.message
			return { success: false, message: error.message }
		}
	}

	//delete workPlace
	const deleteWorkPlace = async (workPlaceId) => {
		try {
			const res = await axios.delete(
				`${apiUrl}/workplace/delete/${workPlaceId}`
			)
			if (res.data.success) {
				dispatch({
					type: REMOVE_WORKPLACE,
					payload: res.data.workPlace,
				})
			}
			getAllWorkPlaces()
			return res.data
		} catch (error) {
			if (error.message) return error.message
			return { success: false, message: error.message }
		}
	}

	//context data
	const workPlaceContextData = {
		workPlaceState,
		createWorkPlace,
		updateWorkPlace,
		deleteWorkPlace,
		getAllWorkPlaces,
	}

	//return
	return (
		<WorkPlaceContext.Provider value={workPlaceContextData}>
			{children}
		</WorkPlaceContext.Provider>
	)
}

export default WorkPlaceContextProvider
