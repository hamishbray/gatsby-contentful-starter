import React from 'react'
import { Link } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

import { GenericItem, isArticleItem, isBlogItem } from '../models/common'
import AnimateUp from './animateUp'

type Props = {
	cards: GenericItem[]
}

const Cards: React.FC<Props> = ({ cards }: Props) => (
	<div className="grid gap-8 md:grid-cols-3 sm:grid-cols-1 sm:gap-4">
		{cards?.map((card: GenericItem, index: number) => {
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
				<AnimateUp key={index} delay={index * 200}>
					<Link
						className="no-underline hover:no-underline"
						to={`/${type}/${card.slug}`}
					>
						<div className="px-4 pb-4 shadow">
							<h4 className="hover:underline">{card.title}</h4>
							{image && <GatsbyImage alt={card.title} image={image} />}
							{summary && (
								<div
									className="mt-2"
									dangerouslySetInnerHTML={{
										__html: summary.childMarkdownRemark.html,
									}}
								></div>
							)}
						</div>
					</Link>
				</AnimateUp>
			)
		})}
	</div>
)

export default Cards
