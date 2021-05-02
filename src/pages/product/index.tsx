import React from 'react'
import { graphql, Link } from 'gatsby'
import { useActions, useValues } from 'kea'

import Layout from '../../components/layout'
import SEO from '../../components/seo'
import LoadingButton from '../../components/loadingButton'

import { AllContentResult } from '../../node-utils/types'
import { BCProductItem } from '../../models/product'
import { BCListItem } from '../../models/cart'

import { cartLogic } from '../../logic/cart'
import { productsLogic } from '../../logic/products'

type Props = AllContentResult<BCProductItem, 'products'>

const ProductsLandingPage: React.FC<Props> = ({ data }: Props) => {
	const { cart, cartLoading } = useValues(cartLogic)
	const { addToCart, removeItemFromCart } = useActions(cartLogic)
	const { products } = useValues(productsLogic)
	const items = data?.products.nodes ?? []

	const buttonClasses =
		'cursor-pointer inline-flex items-center px-4 py-2 mt-4 border-2 border-black rounded hover:border-gray-500 hover:text-black'

	const getLineItem = (
		sku: string,
		productType: string
	): BCListItem | undefined => {
		const lineItemType = `${productType}_items`

		return cart
			? (cart.line_items?.[lineItemType] as BCListItem[]).find(
					item => item.sku === sku
			  )
			: undefined
	}

	return (
		<Layout>
			<SEO title="Our Products" />
			<h1>Our Awesome Products</h1>
			{items.map(
				({
					base_variant_id,
					bigcommerce_id,
					calculated_price,
					description,
					custom_url,
					name,
					price,
					sku,
					type,
				}) => {
					const lineItem = getLineItem(sku, type)

					return (
						<div key={bigcommerce_id}>
							<h2>
								<Link to={`/product${custom_url.url}`}>{name}</Link>
							</h2>
							<div
								dangerouslySetInnerHTML={{
									__html: description,
								}}
							></div>
							<p className="my-2">
								<span className="font-bold">Price: </span>
								{calculated_price !== price && (
									<span className="line-through">${price} </span>
								)}
								<span>${calculated_price}</span>
							</p>
							<div className="mb-6" style={{ height: '42px' }}>
								<p>
									{lineItem ? (
										<span
											className={buttonClasses}
											onClick={() => removeItemFromCart(lineItem.id)}
										>
											Remove
										</span>
									) : (
										<span
											className={buttonClasses}
											onClick={() => addToCart(bigcommerce_id, base_variant_id)}
										>
											Add to Cart
										</span>
									)}
								</p>
							</div>
						</div>
					)
				}
			)}
			<div className="mt-8">
				<Link to={'/cart'}>View Cart</Link>
			</div>
		</Layout>
	)
}

export default ProductsLandingPage

export const query = graphql`
	{
		products: allBigCommerceProduct(filter: { type: { eq: "digital" } }) {
			nodes {
				availability
				base_variant_id
				bigcommerce_id
				calculated_price
				categories
				custom_url {
					url
				}
				date_modified(formatString: "MMM Do, YYYY")
				description
				id
				images {
					description
					is_thumbnail
					url_standard
					url_thumbnail
				}
				name
				price
				reviews_rating_sum
				reviews_count
				sku
				type
				view_count
			}
		}
	}
`
