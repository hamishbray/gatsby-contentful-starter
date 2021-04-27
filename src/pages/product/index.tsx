import React from 'react'
import { graphql, Link } from 'gatsby'
import { useActions, useValues } from 'kea'
import { LineItem } from 'shopify-buy'

import Layout from '../../components/layout'
import SEO from '../../components/seo'

import { AllContentfulResult } from '../../node-utils/types'
import { ProductItem } from '../../models/product'

import { cartLogic } from '../../logic/cart'
import { useCheckout } from '../../utils/cart'

type Props = AllContentfulResult<ProductItem, 'products'>

const ProductsLandingPage: React.FC<Props> = ({ data }: Props) => {
	const { cart } = useValues(cartLogic)
	const { addVariantToCart, removeLineItem } = useActions(cartLogic)
	useCheckout()
	const products = data?.products.nodes ?? []

	const getLineItem = (id: string): LineItem | undefined =>
		//@ts-ignore
		cart?.lineItems.find(item => item.variant.id === id)

	return (
		<Layout>
			<SEO title="Our Courses" />
			<h1>Our Awesome Courses</h1>
			{products.map(({ descriptionHtml, slug, title, variants }, index) => {
				const lineItem = getLineItem(variants[0].shopifyId)

				return (
					<div key={index}>
						<h2>
							<Link to={`/product/${slug}`}>{title}</Link>
						</h2>
						<div
							dangerouslySetInnerHTML={{
								__html: descriptionHtml,
							}}
						></div>
						<p className="my-2">
							<span className="font-bold">Price: </span>
							<span>${variants[0].price}</span>
						</p>
						<div className="mb-6" style={{ height: '42px' }}>
							{cart && (
								<p>
									{lineItem ? (
										<span
											className="inline-block px-4 py-2 font-bold border border-black cursor-pointer"
											onClick={() => removeLineItem(lineItem.id)}
										>
											Remove
										</span>
									) : (
										<span
											className="inline-block px-4 py-2 font-bold border border-black cursor-pointer"
											onClick={() => addVariantToCart(variants[0].shopifyId, 1)}
										>
											Add to Cart
										</span>
									)}
								</p>
							)}
						</div>
					</div>
				)
			})}
			<div className="mt-8">
				<Link to={'/cart'}>View Cart</Link>
			</div>
		</Layout>
	)
}

export default ProductsLandingPage

export const query = graphql`
	{
		products: allShopifyProduct(
			filter: { availableForSale: { eq: true }, productType: { eq: "Course" } }
		) {
			nodes {
				descriptionHtml
				id
				images {
					localFile {
						childrenImageSharp {
							gatsbyImageData(width: 288, height: 192)
						}
					}
				}
				priceRange {
					minVariantPrice {
						amount
						currencyCode
					}
				}
				shopifyId
				slug: handle
				tags
				title
				variants {
					id
					price
					shopifyId
					sku
				}
			}
		}
	}
`
