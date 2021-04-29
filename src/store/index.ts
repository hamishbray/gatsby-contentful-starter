import { resetContext, getContext } from 'kea'

resetContext({
	createStore: {
		paths: ['cart', 'products'],
	},
	plugins: [],
})

export const { store } = getContext()
