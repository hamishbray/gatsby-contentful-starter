import React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

import Layout from '../components/layout'
import { ProductItem } from '../models/product'
import { ContentfulResult } from '../node-utils/types'

type Props = ContentfulResult<ProductItem, 'productItem'>

const ProductPage: React.FC<Props> = ({ data }: Props) => {
	const { descriptionHtml, images, tags, title, publishedAt } =
		data?.productItem ?? ({} as ProductItem)

	const pageImage = getImage(
		images[0].localFile.childrenImageSharp[0].gatsbyImageData
	)

	return (
		<Layout>
			<div className="product">
				<section>
					<h1>{title}</h1>
					{pageImage && (
						<GatsbyImage alt={title} image={pageImage} loading="eager" />
					)}
					<p className="mt-6 italic">Posted: {publishedAt}</p>
					{tags && (
						<div className="flex mt-4">
							{tags.map((tag, index) => (
								<span
									key={index}
									className="px-3 py-1 mr-2 text-white bg-yellow-900 rounded-full"
								>
									{tag}
								</span>
							))}
						</div>
					)}
					<div
						className="mt-4"
						dangerouslySetInnerHTML={{
							__html: descriptionHtml,
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
		productItem: shopifyProduct(handle: { eq: $slug }) {
			descriptionHtml
			images {
				localFile {
					childrenImageSharp {
						gatsbyImageData(layout: FULL_WIDTH)
					}
				}
			}
			publishedAt(formatString: "MMM Do, YYYY")
			title
			tags
		}
	}
`
