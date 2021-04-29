import React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

import { ArticleItem } from '../models/article'
import { ContentResult } from '../node-utils/types'

import Cards from '../components/cards'
import Layout from '../components/layout'
import { getRichText } from '../components/richText'

type Props = ContentResult<ArticleItem, 'articleItem'>

const ArticlePage: React.FC<Props> = ({ data }: Props) => {
	const { bodyCopy, postDate, relatedArticles, teaserImage, title } =
		data?.articleItem ?? ({} as ArticleItem)

	const pageImage = getImage(teaserImage)

	return (
		<Layout>
			<div className="blog-post">
				<section>
					<h1>{title}</h1>
					{pageImage && (
						<GatsbyImage alt={title} image={pageImage} loading="eager" />
					)}
					<p className="mt-6 italic">Posted: {postDate}</p>
					{getRichText(bodyCopy)}
				</section>
				{relatedArticles.length > 0 && (
					<section className="mt-8">
						<h2>Related Articles</h2>
						<Cards cards={relatedArticles} />
					</section>
				)}
			</div>
		</Layout>
	)
}

export default ArticlePage

export const query = graphql`
	query articleBySlug($slug: String!) {
		articleItem: contentfulArticle(slug: { eq: $slug }) {
			bodyCopy {
				raw
				references {
					... on ContentfulArticle {
						__typename
						contentful_id
						title
						slug
					}
					... on ContentfulAsset {
						__typename
						contentful_id
						description
						file {
							contentType
							url
							fileName
						}
						gatsbyImageData(layout: CONSTRAINED)
					}
				}
			}
			id
			postDate(formatString: "MMM Do, YYYY")
			relatedArticles {
				title
				teaserImage {
					gatsbyImageData(width: 288, height: 192)
				}
				slug
				summary {
					childMarkdownRemark {
						html
					}
				}
				__typename
			}
			slug
			summary {
				childMarkdownRemark {
					html
				}
			}
			teaserImage {
				gatsbyImageData(layout: FULL_WIDTH)
			}
			title
			updatedAt
		}
	}
`
