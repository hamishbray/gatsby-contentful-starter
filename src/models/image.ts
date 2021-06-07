import { IGatsbyImageData } from 'gatsby-plugin-image'

export interface ImageItem {
	title: string
	description: string
	media: IGatsbyImageData
	__typename: 'ContentfulImage'
}
