import { createContext, useReducer, useEffect } from 'react'
import axios from 'axios'
import { apiUrl } from './constants'
import {
	ADD_CARD,
	UPDATE_CARD,
	REMOVE_CARD,
	ALL_CARDS,
	ADD_CARD_CSV,
} from '../reducers/type'
import { cardReducer } from '../reducers/cardReducer'

export const CardContext = createContext()

const CardContextProvider = ({ children }) => {
	const [cardState, dispatch] = useReducer(cardReducer, { allCards: [] })

	//get all tables
	const getAllCard = async () => {
		try {
			const res = await axios.get(`${apiUrl}/card/`)
			if (res.data.success) {
				dispatch({ type: ALL_CARDS, payload: res.data.cards })
			}
		} catch (error) {
			if (error.message) return error.message
			return { success: false, message: error.message }
		}
	}

	useEffect(() => {
		getAllCard()
	}, [])

	//create card
	const createCard = async (cardData) => {
		try {
			const res = await axios.post(`${apiUrl}/card/create`, cardData)
			if (res.data.success) {
				dispatch({ type: ADD_CARD, payload: res.data.card })
			}
			getAllCard()
			return res.data
		} catch (error) {
			if (error.message) return error.message
			return { success: false, message: error.message }
		}
	}

	//create card from file csv
	const createCardCSV = async (listCardAdd) => {
		try {
			const res = await axios.post(
				`${apiUrl}/card/createcsv`,
				listCardAdd
			)
			if (res.data.success) {
				dispatch({ type: ADD_CARD_CSV, payload: res.data.cards })
			}
			getAllCard()
			return res.data
		} catch (error) {
			if (error.message) return error.message
			return { success: false, message: error.message }
		}
	}

	//update card
	const updateCard = async (cardData) => {
		const { id, formCard } = cardData
		try {
			const res = await axios.post(
				`${apiUrl}/card/update/${id}`,
				formCard
			)
			if (res.data.success) {
				dispatch({ type: UPDATE_CARD, payload: res.data.card })
			}
			return res.data
		} catch (error) {
			if (error.message) return error.message
			return { success: false, message: error.message }
		}
	}

	//delete card
	const deleteCard = async (cardId) => {
		try {
			const res = await axios.delete(`${apiUrl}/card/delete/${cardId}`)
			if (res.data.success) {
				dispatch({ type: REMOVE_CARD, payload: res.data.card })
			}
			getAllCard()
			return res.data
		} catch (error) {
			if (error.message) return error.message
			return { success: false, message: error.message }
		}
	}

	//context data
	const columnContextData = {
		cardState,
		createCard,
		updateCard,
		deleteCard,
		createCardCSV,
		getAllCard,
	}

	//return
	return (
		<CardContext.Provider value={columnContextData}>
			{children}
		</CardContext.Provider>
	)
}

export default CardContextProvider
