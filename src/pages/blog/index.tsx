import React from 'react'
import { graphql, Link } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

import Layout from '../../components/layout'
import SEO from '../../components/seo'
import { AllContentfulResult } from '../../node-utils/types'
import { BlogItem } from '../../models/blog'

type Props = AllContentfulResult<BlogItem, 'posts'>

const BlogLandingPage: React.FC<Props> = ({ data }: Props) => {
	const posts = data?.posts.nodes ?? []
	return (
		<Layout>
			<SEO title="Blog Posts" />
			<h1>Blog Posts</h1>
			<div className="grid gap-8 md:grid-cols-3 sm:grid-cols-1 sm:gap-4">
				{posts?.map(({ description, heroImage, title, slug }, index) => {
					const image = getImage(heroImage)

					return (
						<Link key={index} to={`/blog/${slug}`}>
							<div className="px-4 pb-4 shadow">
								<h4>{title}</h4>
								{image && <GatsbyImage alt={title} image={image} />}
								<div
									dangerouslySetInnerHTML={{
										__html: description.childMarkdownRemark.html,
									}}
								></div>
							</div>
						</Link>
					)
				})}
			</div>
		</Layout>
	)
}

export default BlogLandingPage

export const query = graphql`
	{
		posts: allContentfulBlogPost {
			nodes {
				description {
					childMarkdownRemark {
						html
					}
				}
				heroImage {
					gatsbyImageData(width: 225, height: 150)
				}
				slug
				title
			}
		}
	}
`
