import { createContext, useReducer, useEffect } from 'react'
import axios from 'axios'
import { apiUrl } from './constants'
import {
	ADD_TABLE,
	UPDATE_TABLE,
	REMOVE_TABLE,
	ALL_TABLES,
} from '../reducers/type'
import { tableReducer } from '../reducers/tableReducer'

export const TableContext = createContext()

const TableContextProvider = ({ children }) => {
	const [tableState, dispatch] = useReducer(tableReducer, { tables: [] })

	//get all tables
	const getAllTables = async () => {
		try {
			const res = await axios.get(`${apiUrl}/table/`)
			if (res.data.success) {
				dispatch({ type: ALL_TABLES, payload: res.data.tables })
			}
		} catch (error) {
			if (error.message) return error.message
			return { success: false, message: error.message }
		}
	}

	useEffect(() => {
		getAllTables()
	}, [])

	//create table
	const createTable = async (tableData) => {
		try {
			const res = await axios.post(`${apiUrl}/table/create`, tableData)
			if (res.data.success) {
				dispatch({ type: ADD_TABLE, payload: res.data.table })
			}
			return res.data
		} catch (error) {
			if (error.message) return error.message
			return { success: false, message: error.message }
		}
	}

	//update table
	const updateTable = async (tableData) => {
		const { id, isAddMember, tableInfor } = tableData
		try {
			const res = await axios.post(
				`${apiUrl}/table/update/${id}/${isAddMember}`,
				tableInfor
			)
			if (res.data.success) {
				dispatch({ type: UPDATE_TABLE, payload: res.data.table })
			}
			return res.data
		} catch (error) {
			if (error.message) return error.message
			return { success: false, message: error.message }
		}
	}

	//delete table
	const deleteTable = async (tableId) => {
		try {
			const res = await axios.delete(`${apiUrl}/table/delete/${tableId}`)
			if (res.data.success) {
				dispatch({ type: REMOVE_TABLE, payload: res.data.table })
			}
			return res.data
		} catch (error) {
			if (error.message) return error.message
			return { success: false, message: error.message }
		}
	}

	//context data
	const tableContextData = {
		tableState,
		createTable,
		updateTable,
		deleteTable,
		getAllTables,
	}

	//return
	return (
		<TableContext.Provider value={tableContextData}>
			{children}
		</TableContext.Provider>
	)
}

export default TableContextProvider
