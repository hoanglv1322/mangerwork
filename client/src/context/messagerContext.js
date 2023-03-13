import { createContext, useReducer, useEffect } from 'react'
import axios from 'axios'
import { apiUrl } from './constants'
import {
	ADD_MESSAGER,
	UPDATE_MESSAGER,
	REMOVE_MESSAGER,
	ALL_MESSAGERS,
} from '../reducers/type'
import { messagerReducer } from '../reducers/messagerReducer'

export const MessagerContext = createContext()

const MessagerContextProvider = ({ children }) => {
	const [messagerState, dispatch] = useReducer(messagerReducer, {
		allMessagers: [],
	})

	//get all comments
	const getAllMessager = async () => {
		try {
			const res = await axios.get(`${apiUrl}/messager/`)
			if (res.data.success) {
				dispatch({ type: ALL_MESSAGERS, payload: res.data.messagers })
			}
		} catch (error) {
			if (error.message) return error.message
			return { success: false, message: error.message }
		}
	}

	useEffect(() => {
		getAllMessager()
	}, [])

	//create messager
	const createMessager = async (messagerData) => {
		try {
			const res = await axios.post(
				`${apiUrl}/messager/create`,
				messagerData
			)
			if (res.data.success) {
				dispatch({ type: ADD_MESSAGER, payload: res.data.messager })
			}
			getAllMessager()
			return res.data
		} catch (error) {
			if (error.message) return error.message
			return { success: false, message: error.message }
		}
	}

	//update messager
	const updateMessager = async (messagerData) => {
		const { id, inforMessager } = messagerData
		try {
			const res = await axios.post(
				`${apiUrl}/messager/update/${id}`,
				inforMessager
			)
			if (res.data.success) {
				dispatch({ type: UPDATE_MESSAGER, payload: res.data.messager })
			}
			return res.data
		} catch (error) {
			if (error.message) return error.message
			return { success: false, message: error.message }
		}
	}

	//delete messager
	const deleteMessager = async (messagerId) => {
		try {
			const res = await axios.delete(
				`${apiUrl}/messager/delete/${messagerId}`
			)
			if (res.data.success) {
				dispatch({ type: REMOVE_MESSAGER, payload: res.data.mess })
			}
			return res.data
		} catch (error) {
			if (error.message) return error.message
			return { success: false, message: error.message }
		}
	}

	//context data
	const messagerContextData = {
		messagerState,
		createMessager,
		updateMessager,
		deleteMessager,
		getAllMessager,
	}

	//return
	return (
		<MessagerContext.Provider value={messagerContextData}>
			{children}
		</MessagerContext.Provider>
	)
}

export default MessagerContextProvider
