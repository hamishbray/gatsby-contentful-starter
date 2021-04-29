import { kea, MakeLogicType } from 'kea'

import { BCCart } from '../models/cart'

interface Values {
	cart?: BCCart | null
	cartLoading: boolean
	cartError?: string
}

interface Actions {
	fetchCart: () => boolean
	addToCart: (
		productId: number,
		variantId: number,
		retry?: boolean
	) => { productId: number; variantId: number; retry: boolean }
	removeItemFromCart: (itemId: string) => { itemId: string }
	updateCartItemQuantity: (
		itemId: string,
		updatedItemData: any
	) => { itemId: string; updatedItemData: any }
	setCart: (cart?: BCCart) => { cart: BCCart | undefined }
	setCartError: (error: string) => { error: string }
}

interface Props {}

type CartLogicType = MakeLogicType<Values, Actions, Props>

export const cartLogic = kea<CartLogicType>({
	path: () => ['cart'],
	actions: {
		fetchCart: true,
		addToCart: (productId, variantId, retry) => ({
			productId,
			variantId,
			retry,
		}),
		removeItemFromCart: itemId => ({ itemId }),
		updateCartItemQuantity: (itemId, updatedItemData) => ({
			itemId,
			updatedItemData,
		}),
		setCart: cart => ({ cart }),
		setCartError: error => ({ error }),
	},
	reducers: {
		cart: [
			null,
			{
				setCart: (_, { cart }) => cart,
			},
		],
		cartLoading: [
			false,
			{
				fetchCart: () => true,
				addToCart: () => true,
				removeItemFromCart: () => true,
				setCart: () => false,
				setCartError: () => false,
			},
		],
		cartError: [
			null,
			{
				fetchCart: () => null,
				addToCart: () => null,
				removeItemFromCart: () => null,
				setCartError: (_, { error }) => error,
			},
		],
	},
	events: ({ actions }) => ({
		afterMount: () => actions.fetchCart(),
	}),
	listeners: ({ actions }) => ({
		fetchCart: async () => {
			try {
				console.log('trying to hit bigcommerce lambda function')
				const result = await fetch(
					`/.netlify/functions/bigcommerce?endpoint=carts`,
					{
						credentials: 'same-origin',
						mode: 'same-origin',
					}
				)
				console.log('got result back from bigcommerce lambda function')
				const response = await result.json()
				if (response.status === 200) actions.setCart(response.data)
				else actions.setCartError(response.message)
			} catch (error) {
				console.error('Error fetching cart: ', error)
				actions.setCartError(error)
			}
		},
		addToCart: async ({ productId, variantId, retry }) => {
			try {
				const result = await fetch(
					`/.netlify/functions/bigcommerce?endpoint=carts/items`,
					{
						method: 'POST',
						credentials: 'same-origin',
						mode: 'same-origin',
						body: JSON.stringify({
							line_items: [
								{
									quantity: 1,
									product_id: productId,
									variant_id: variantId,
								},
							],
						}),
					}
				)

				if (result.status === 404 && !retry) {
					// Recreate a cart if it was destroyed
				}

				const response = await result.json()
				actions.setCart(response.data)
			} catch (error) {
				console.error('Error adding item to cart: ', error)
				actions.setCartError(error)
			}
		},
		removeItemFromCart: async ({ itemId }) => {
			try {
				const result = await fetch(
					`/.netlify/functions/bigcommerce?endpoint=carts/items&itemId=${itemId}`,
					{
						credentials: 'same-origin',
						mode: 'same-origin',
						method: 'delete',
					}
				)

				if (result.status === 204) {
					actions.setCart(undefined)
					return
				}

				const response = await result.json()
				actions.setCart(response.data)
			} catch (error) {
				console.error('Error removing item from cart: ', error)
				actions.setCartError(error)
			}
		},
	}),
})
