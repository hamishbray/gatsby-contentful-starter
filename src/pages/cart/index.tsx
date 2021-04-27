import React from 'react'
import { useActions, useValues } from 'kea'

import { cartLogic } from '../../logic/cart'
import { useCheckout } from '../../utils/cart'

import Layout from '../../components/layout'
import SEO from '../../components/seo'

const CartPage: React.FC = () => {
	const { cart } = useValues(cartLogic)
	const { removeLineItem } = useActions(cartLogic)
	useCheckout()

	const hasCartItems = (cart?.lineItems && cart.lineItems.length > 0) as boolean

	return (
		<Layout>
			<SEO title="Cart" />
			<h1>Cart</h1>
			{cart && (
				<div>
					{hasCartItems ? (
						<div>
							{cart?.lineItems.map(
								//@ts-ignore - typings are incorrect, 'variant' is missing
								({ quantity, title, variant: { price }, id }, index) => (
									<div key={index}>
										<p>
											<span className="font-bold">Title: </span>
											<span>{title}</span>
										</p>
										<p>
											<span className="font-bold">Quantity: </span>
											<span>{quantity}</span>
										</p>
										<p>
											<span className="font-bold">Price: </span>
											<span>${price}</span>
										</p>
										<p className="mb-6">
											<span
												className="inline-block px-4 py-2 font-bold border border-black cursor-pointer"
												onClick={() => removeLineItem(id)}
											>
												Remove
											</span>
										</p>
									</div>
								)
							)}
							<div className="mt-8">
								<a href={cart?.webUrl}>Checkout</a>
							</div>
						</div>
					) : (
						<h3>No items in cart.</h3>
					)}
				</div>
			)}
		</Layout>
	)
}

export default CartPage
