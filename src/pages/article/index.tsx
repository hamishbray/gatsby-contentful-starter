import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../../components/layout'
import SEO from '../../components/seo'
import Cards from '../../components/cards'

import { AllContentfulResult } from '../../node-utils/types'
import { ArticleItem } from '../../models/article'

type Props = AllContentfulResult<ArticleItem, 'articles'>

const ArticleLandingPage: React.FC<Props> = ({ data }: Props) => {
	const articles = data?.articles.nodes ?? []

	return (
		<Layout>
			<SEO title="Articles" />
			<h1>Articles</h1>
			<Cards cards={articles} />
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
				__typename
			}
		}
	}
`
