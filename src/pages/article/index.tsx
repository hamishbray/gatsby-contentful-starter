import React from 'react'
import { graphql, Link } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

import Layout from '../../components/layout'
import SEO from '../../components/seo'
import { AllContentfulResult } from '../../node-utils/types'
import { ArticleItem } from '../../models/article'

type Props = AllContentfulResult<ArticleItem, 'articles'>

const ArticleLandingPage: React.FC<Props> = ({ data }: Props) => {
	const articles = data?.articles.nodes ?? []
	return (
		<Layout>
			<SEO title="Articles" />
			<h1>Articles</h1>
			<div className="grid gap-8 md:grid-cols-3 sm:grid-cols-1 sm:gap-4">
				{articles?.map(({ summary, teaserImage, title, slug }, index) => {
					const image = getImage(teaserImage)
					return (
						<Link key={index} to={`/article/${slug}`}>
							<div className="px-4 pb-4 shadow">
								<h4>{title}</h4>
								{image && <GatsbyImage alt={title} image={image} />}
								<div
									dangerouslySetInnerHTML={{
										__html: summary.childMarkdownRemark.html,
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

export default ArticleLandingPage

export const query = graphql`
	{
		articles: allContentfulArticle {
			nodes {
				summary {
					childMarkdownRemark {
						html
					}
				}
				teaserImage {
					gatsbyImageData(width: 288, height: 192)
				}
				slug
				title
			}
		}
	}
`
