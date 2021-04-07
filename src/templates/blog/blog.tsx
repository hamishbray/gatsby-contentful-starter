import React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

import Layout from '../../components/layout'
import { BlogItem } from '../../models/blog'
import { ContentfulResult } from '../../node-utils/types'

type Props = ContentfulResult<BlogItem, 'blogItem'>

const BlogPage: React.FC<Props> = ({ data }: Props) => {
	const {
		author: { name, image },
		body,
		heroImage,
		publishDate,
		tags,
		title,
	} = data?.blogItem ?? ({} as BlogItem)

	const pageImage = getImage(heroImage)
	const authorImage = getImage(image)

	return (
		<Layout>
			<div className="blog-post">
				<div>
					<h1>{title}</h1>
					{pageImage && <GatsbyImage alt={title} image={pageImage} />}
					<p className="mt-6 italic">Posted: {publishDate}</p>
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
						dangerouslySetInnerHTML={{
							__html: body.childMarkdownRemark.html,
						}}
					></div>
					{authorImage && (
						<div className="mt-4">
							<GatsbyImage alt={name} image={authorImage} />
							<p>{name}</p>
						</div>
					)}
				</div>
			</div>
		</Layout>
	)
}

export default BlogPage

export const query = graphql`
	query blogBySlug($slug: String!) {
		blogItem: contentfulBlogPost(slug: { eq: $slug }) {
			author {
				name
				image {
					gatsbyImageData(width: 150, height: 150)
				}
			}
			body {
				childMarkdownRemark {
					html
				}
			}
			heroImage {
				gatsbyImageData(layout: FULL_WIDTH)
			}
			publishDate(formatString: "MMM Do, YYYY")
			title
			tags
		}
	}
`
