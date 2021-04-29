import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import { BCProductItem } from '../models/product'
import { ContentResult } from '../node-utils/types'

type Props = ContentResult<BCProductItem, 'productItem'>

const ProductPage: React.FC<Props> = ({ data }: Props) => {
	const { date_modified, description, images, name } =
		data?.productItem ?? ({} as BCProductItem)

	return (
		<Layout>
			<div className="product">
				<section>
					<h1>{name}</h1>
					<img alt={name} src={images[0].url_standard} />
					<p className="mt-6 italic">Last updated: {date_modified}</p>
					<div
						className="mt-4"
						dangerouslySetInnerHTML={{
							__html: description,
						}}
					></div>
				</section>
			</div>
		</Layout>
	)
}

export default ProductPage

export const query = graphql`
	query productBySlug($slug: String!) {
		productItem: bigCommerceProduct(custom_url: { url: { eq: $slug } }) {
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
`
