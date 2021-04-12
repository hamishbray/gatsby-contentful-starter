import React from 'react'
import { Link } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

import { ArticleItem } from '../models/article'
import { BlogItem } from '../models/blog'
import { isArticleItem, isBlogItem } from '../models/common'

type Props = {
	cards: ArticleItem[] | BlogItem[]
}

const Cards: React.FC<Props> = ({ cards }: Props) => (
	<div className="grid gap-8 md:grid-cols-3 sm:grid-cols-1 sm:gap-4">
		{cards?.map((card: ArticleItem | BlogItem, index: number) => {
			let image, summary, type

			if (isArticleItem(card)) {
				image = getImage(card.teaserImage)
				summary = card.summary
				type = 'article'
			} else if (isBlogItem(card)) {
				image = getImage(card.heroImage)
				summary = card.description
				type = 'blog'
			}

			return (
				<Link
					key={index}
					className="no-underline hover:no-underline"
					to={`/${type}/${card.slug}`}
				>
					<div className="px-4 pb-4 shadow">
						<h4 className="hover:underline">{card.title}</h4>
						{image && <GatsbyImage alt={card.title} image={image} />}
						{summary && (
							<div
								dangerouslySetInnerHTML={{
									__html: summary.childMarkdownRemark.html,
								}}
							></div>
						)}
					</div>
				</Link>
			)
		})}
	</div>
)

export default Cards
