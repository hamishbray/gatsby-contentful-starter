import { useEffect, useRef } from 'react'
import { useActions, useValues } from 'kea'
import { Cart } from 'shopify-buy'

import { cartLogic, client } from '../logic/cart'

const LOCAL_STORAGE_CHECKOUT_KEY = 'shopify_checkout_id'

export function useCheckout() {
	const { cart } = useValues(cartLogic)
	const { setCart } = useActions(cartLogic)

	//const isRemoved = useRef(false)

	useEffect(() => {
		const initialiseCheckout = async () => {
			const isBrowser = typeof window !== 'undefined'

			const currentCheckoutId = isBrowser
				? localStorage.getItem(LOCAL_STORAGE_CHECKOUT_KEY)
				: null

			const initialiseCart = (cart: Cart) => {
				isBrowser &&
					localStorage.setItem(LOCAL_STORAGE_CHECKOUT_KEY, cart.id as string)
				setCart(cart)
			}

			const createNewCart = async (): Promise<Cart> => client.checkout.create()
			const fetchCart = (id: string): Promise<Cart> => client.checkout.fetch(id)

			if (currentCheckoutId) {
				try {
					const cart = await fetchCart(currentCheckoutId)
					if (!cart.completedAt) initialiseCart(cart)
					return
				} catch (error) {
					localStorage.removeItem(LOCAL_STORAGE_CHECKOUT_KEY)
				}
			}

			const newCart = await createNewCart()
			initialiseCart(newCart)
		}

		initialiseCheckout()
	}, [])
}
