import { resetContext, getContext } from 'kea'

resetContext({
	createStore: {
		paths: ['cart'],
	},
	plugins: [],
})

export const { store } = getContext()
