import React from 'react'
import { useActions, useValues } from 'kea'

import { cartLogic } from '../../logic/cart'

import Layout from '../../components/layout'
import SEO from '../../components/seo'

const CartPage: React.FC = () => {
	const { cart } = useValues(cartLogic)
	const { removeItemFromCart } = useActions(cartLogic)

	const hasCartItems =
		cart?.line_items &&
		(cart.line_items.custom_items.length ||
			cart.line_items.digital_items.length ||
			cart.line_items.gift_certificates.length ||
			cart.line_items.physical_items.length)

	const digitalItems = cart?.line_items?.digital_items ?? []

	return (
		<Layout>
			<SEO title="Cart" />
			<h1>Cart</h1>
			{hasCartItems ? (
				<div>
					{digitalItems.map(({ id, sale_price, quantity, name }) => (
						<div key={id}>
							<p>
								<span className="font-bold">Title: </span>
								<span>{name}</span>
							</p>
							<p>
								<span className="font-bold">Quantity: </span>
								<span>{quantity}</span>
							</p>
							<p>
								<span className="font-bold">Price: </span>
								<span>${sale_price}</span>
							</p>
							<p className="mb-6">
								<span
									className="inline-block px-4 py-2 font-bold border border-black cursor-pointer"
									onClick={() => removeItemFromCart(id)}
								>
									Remove
								</span>
							</p>
						</div>
					))}
					<div className="mt-8">
						<a href={cart?.redirect_urls.checkout_url}>Checkout</a>
					</div>
				</div>
			) : (
				<h3>No items in cart.</h3>
			)}
		</Layout>
	)
}

export default CartPage
