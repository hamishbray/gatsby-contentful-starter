import { resetContext, getContext } from 'kea'

resetContext({
	createStore: {
		paths: ['cart', 'prices'],
	},
	plugins: [],
})

export const { store } = getContext()
