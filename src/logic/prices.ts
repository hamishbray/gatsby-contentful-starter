import { kea, MakeLogicType } from 'kea'

interface Values {
	prices?: any
}

interface Actions {
	fetchPrices: boolean
	setPrices: (prices: any) => { prices: any }
}

interface Props {}

type PricesLogicType = MakeLogicType<Values, Actions, Props>

export const pricesLogic = kea<PricesLogicType>({
	path: () => ['prices'],
	actions: {
		fetchPrices: true,
		setPrices: prices => ({ prices }),
	},
	reducers: {
		prices: [
			null,
			{
				setPrices: (_, { prices }) => prices,
			},
		],
	},
	listeners: ({ actions }) => ({
		fetchPrices: async () => {
			try {
				const result = await fetch(
					`/.netlify/functions/bigcommerce?endpoint=catalog/products`,
					{
						credentials: 'same-origin',
						mode: 'same-origin',
					}
				)
				const response = await result.json()
				const prices = response.data?.reduce((prices, item) => {
					prices[item.id] = item
					return prices
				}, {})
				actions.setPrices(prices)
			} catch (error) {
				console.error('Error fetching prices: ', error)
			}
		},
	}),
})
