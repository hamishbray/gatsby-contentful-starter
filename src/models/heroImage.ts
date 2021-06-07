import { IGatsbyImageData } from 'gatsby-plugin-image'

export interface HeroImageItem {
	title: string
	description: string
	image: IGatsbyImageData
	__typename: 'ContentfulHeroImage'
}
