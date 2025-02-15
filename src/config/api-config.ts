import axios from 'axios'

const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_BASE_URL,
	headers: {
		accept: 'application/json',
		Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`
	}
})

// if we didnt know the token
export const setAuthHeader = (token: string) => {
	api.defaults.headers.common.Authorization = `Bearer ${token}`
}

export { api }
