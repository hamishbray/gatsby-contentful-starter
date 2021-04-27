import { kea, MakeLogicType } from 'kea'
import { buildClient, Cart, Client } from 'shopify-buy'

interface Values {
	cart?: Cart
	isUpdating: boolean
}

interface Actions {
	addVariantToCart: (
		variantId: string,
		quantity: number
	) => { variantId: string; quantity: number }
	removeLineItem: (
		lineItemId: string | number
	) => { lineItemId: string | number }
	updateLineItem: (
		lineItemId: string | number,
		quantity: number
	) => {
		lineItemId: string | number
		quantity: number
	}
	isUpdating: (isUpdating: boolean) => { isUpdating: boolean }
	setCart: (cart: Cart) => { cart: Cart }
}

interface Props {}

type CartLogicType = MakeLogicType<Values, Actions, Props>

export const client: Client = buildClient({
	storefrontAccessToken: process.env.SHOPIFY_ACCESS_TOKEN as string,
	domain: `${process.env.SHOPIFY_SHOP_NAME}.myshopify.com`,
})

export const cartLogic = kea<CartLogicType>({
	path: () => ['cart'],
	actions: {
		addVariantToCart: (variantId, quantity) => ({
			variantId,
			quantity,
		}),
		removeLineItem: lineItemId => ({ lineItemId }),
		updateLineItem: (lineItemId, quantity) => ({
			lineItemId,
			quantity,
		}),
		isUpdating: isUpdating => ({ isUpdating }),
		setCart: (cart: Cart) => ({ cart }),
	},
	reducers: {
		cart: [
			null,
			{
				setCart: (_, { cart }) => cart,
			},
		],
		isUpdating: [
			false,
			{
				isUpdating: (_, { isUpdating }) => isUpdating,
			},
		],
	},
	listeners: ({ actions, values }) => ({
		addVariantToCart: async ({ variantId, quantity }) => {
			if (variantId === '' || !quantity) {
				console.error('Both a size and quantity are required.')
				return
			}
			actions.isUpdating(true)

			const { cart } = values

			try {
				const result = await client.checkout.addLineItems(cart?.id as string, [
					{ variantId, quantity },
				])
				actions.setCart(result)
			} catch (error) {
				console.error('Error adding item to cart: ', error)
			} finally {
				actions.isUpdating(false)
			}
		},
		removeLineItem: async ({ lineItemId }) => {
			actions.isUpdating(true)

			const { cart } = values

			try {
				const result = await client.checkout.removeLineItems(
					cart?.id as string,
					[lineItemId as string]
				)
				actions.setCart(result)
			} catch (error) {
				console.error('Error removing line item: ', error)
			} finally {
				actions.isUpdating(false)
			}
		},
	}),
})
