import React from 'react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

import { ImageItem } from '../models/image'

import AnimateUp from './animateUp'

type Props = {
	gallery: ImageItem[]
}

const Gallery: React.FC<Props> = ({ gallery }: Props) => (
	<div className="grid gap-8 mt-16 md:grid-cols-3 sm:grid-cols-1 sm:gap-4">
		{gallery.map(({ media, title }, index) => {
			const image = getImage(media)
			const classNames = `mt-${index * 16}` // purgecss: mt-0 mt-16 mt-32

			return (
				<AnimateUp key={index} delay={300 + index * 300}>
					<div className={classNames}>
						{image && <GatsbyImage image={image} alt={title} />}
					</div>
				</AnimateUp>
			)
		})}
	</div>
)

export default Gallery
