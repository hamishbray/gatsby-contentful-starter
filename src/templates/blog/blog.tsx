import React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

import Layout from '../../components/layout'
import { BlogItem } from '../../models/blog'
import { ContentfulResult } from '../../node-utils/types'

type Props = ContentfulResult<BlogItem, 'blogItem'>

const BlogPage: React.FC<Props> = ({ data }: Props) => {
	const { body, title, heroImage } = data?.blogItem ?? ({} as BlogItem)

	const image = heroImage && getImage(heroImage)

	return (
		<Layout>
			<div className="blog-post">
				<div>
					<h1>{title}</h1>
					{image && <GatsbyImage alt={title} image={image} />}
					<div
						dangerouslySetInnerHTML={{
							__html: body?.childMarkdownRemark.html ?? '',
						}}
					></div>
				</div>
			</div>
		</Layout>
	)
}

export default BlogPage

export const query = graphql`
	query blogBySlug($slug: String!) {
		blogItem: contentfulBlogPost(slug: { eq: $slug }) {
			heroImage {
				gatsbyImageData(layout: FULL_WIDTH)
			}
			body {
				childMarkdownRemark {
					html
				}
			}
			title
			tags
		}
	}
`
