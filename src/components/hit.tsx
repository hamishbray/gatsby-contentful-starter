import React from 'react'
import { Link } from 'gatsby'
import { Hit } from 'react-instantsearch-core'
import { GatsbyImage, getImage, IGatsbyImageData } from 'gatsby-plugin-image'

type SearchImage = {
	file?: {
		url: string
	}
	gatsbyImageData: IGatsbyImageData
}

type Props = {
	hit: Hit<{
		summary?: string
		title: string
		url: string
		heroImage: SearchImage
		tags?: string[]
	}>
}

const HitResult: React.FC<Props> = ({
	hit: { summary, title, url, heroImage, tags },
}: Props) => {
	const image = getImage(heroImage.gatsbyImageData)

	return (
		<Link to={url} className="self-start px-6 pt-2 pb-6 hover:no-underline">
			<h3 className="hover:underline">{title}</h3>
			{image && (
				<div className="mb-4">
					<GatsbyImage alt={title} image={image} />
				</div>
			)}
			<div
				className="mb-4"
				dangerouslySetInnerHTML={{ __html: summary ?? '' }}
			></div>
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
		</Link>
	)
}

export default HitResult
