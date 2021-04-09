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
		image: SearchImage
		tags?: string[]
		type: string
	}>
}

const HitResult: React.FC<Props> = ({
	hit: { summary, title, url, image, tags, type },
}: Props) => {
	const thumbnail = getImage(image.gatsbyImageData)

	return (
		<Link
			to={url}
			className="flex flex-col self-start h-full px-6 pt-2 pb-6 hover:no-underline"
		>
			<h3 className="hover:underline">{title}</h3>
			{thumbnail && (
				<div className="mb-2">
					<GatsbyImage alt={title} image={thumbnail} />
				</div>
			)}
			<div
				className="flex-1 mb-3"
				dangerouslySetInnerHTML={{ __html: summary ?? '' }}
			></div>
			{tags && (
				<div className="flex">
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
			<div className="mt-4">
				type: <span className="italic">{type}</span>
			</div>
		</Link>
	)
}

export default HitResult
