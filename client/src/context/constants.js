export const apiUrl =
	process.env.NODE_ENV !== 'production'
		? 'https://manager-work.onrender.com/api'
		: 'something'

export const LOCAL_STORAGE_TOKEN_NAME = 'manager-work-app'
