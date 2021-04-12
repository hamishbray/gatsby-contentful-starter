import React from 'react'
import { graphql, Link } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

import Layout from '../../components/layout'
import SEO from '../../components/seo'
import Cards from '../../components/cards'

import { AllContentfulResult } from '../../node-utils/types'
import { BlogItem } from '../../models/blog'

type Props = AllContentfulResult<BlogItem, 'posts'>

const BlogLandingPage: React.FC<Props> = ({ data }: Props) => {
	const posts = data?.posts.nodes ?? []
	return (
		<Layout>
			<SEO title="Blog Posts" />
			<h1>Blog Posts</h1>
			<Cards cards={posts} />
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
					gatsbyImageData(width: 288, height: 192)
				}
				slug
				title
				__typename
			}
		}
	}
`
