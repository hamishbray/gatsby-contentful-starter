import { kea, MakeLogicType } from 'kea'

interface Values {
	products?: any
}

interface Actions {
	fetchProducts: () => boolean
	setProducts: (products: any) => { products: any }
}

interface Props {}

type ProductsLogicType = MakeLogicType<Values, Actions, Props>

export const productsLogic = kea<ProductsLogicType>({
	path: () => ['products'],
	actions: {
		fetchProducts: true,
		setProducts: products => ({ products }),
	},
	reducers: {
		products: [
			null,
			{
				setProducts: (_, { products }) => products,
			},
		],
	},
	events: ({ actions }) => ({
		afterMount: () => typeof window !== 'undefined' && actions.fetchProducts(),
	}),
	listeners: ({ actions }) => ({
		fetchProducts: async () => {
			console.log('Fetching products')
			try {
				const result = await fetch(
					`/.netlify/functions/bigcommerce?endpoint=catalog/products?include=variants`,
					{
						credentials: 'same-origin',
						mode: 'same-origin',
					}
				)
				const response = await result.json()
				const products = response.data?.reduce((products, item) => {
					products[item.id] = item
					return products
				}, {})
				actions.setProducts(products)
			} catch (error) {
				console.error('Error fetching products: ', error)
			}
		},
	}),
})
