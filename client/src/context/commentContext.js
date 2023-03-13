import { createContext, useReducer, useEffect } from 'react'
import axios from 'axios'
import { apiUrl } from './constants'
import {
	ADD_COMMENT,
	UPDATE_COMMENT,
	REMOVE_COMMENT,
	ALL_COMMENTS,
} from '../reducers/type'
import { commentReducer } from '../reducers/commentReducer'

export const CommentContext = createContext()

const CommentContextProvider = ({ children }) => {
	const [commentState, dispatch] = useReducer(commentReducer, {
		allComments: [],
	})

	//get all comments
	const getAllComment = async () => {
		try {
			const res = await axios.get(`${apiUrl}/comment/`)
			if (res.data.success) {
				dispatch({ type: ALL_COMMENTS, payload: res.data.comments })
			}
		} catch (error) {
			if (error.message) return error.message
			return { success: false, message: error.message }
		}
	}

	useEffect(() => {
		getAllComment()
	}, [])

	//create comment
	const createComment = async (commentData) => {
		try {
			const res = await axios.post(
				`${apiUrl}/comment/create/`,
				commentData
			)
			if (res.data.success) {
				dispatch({ type: ADD_COMMENT, payload: res.data.comment })
			}
			getAllComment()
			return res.data
		} catch (error) {
			if (error.message) return error.message
			return { success: false, message: error.message }
		}
	}

	//update comment
	const updateComment = async (commentData) => {
		const { id, inforComment } = commentData
		try {
			const res = await axios.post(
				`${apiUrl}/comment/update/${id}`,
				inforComment
			)
			if (res.data.success) {
				dispatch({ type: UPDATE_COMMENT, payload: res.data.comment })
			}
			return res.data
		} catch (error) {
			if (error.message) return error.message
			return { success: false, message: error.message }
		}
	}

	//delete card
	const deleteComment = async (commentId) => {
		try {
			const res = await axios.delete(
				`${apiUrl}/comment/delete/${commentId}`
			)
			if (res.data.success) {
				dispatch({ type: REMOVE_COMMENT, payload: res.data.comment })
			}
			return res.data
		} catch (error) {
			if (error.message) return error.message
			return { success: false, message: error.message }
		}
	}

	//context data
	const commentContextData = {
		commentState,
		createComment,
		updateComment,
		deleteComment,
		getAllComment,
	}

	//return
	return (
		<CommentContext.Provider value={commentContextData}>
			{children}
		</CommentContext.Provider>
	)
}

export default CommentContextProvider
