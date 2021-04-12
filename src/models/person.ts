import { IGatsbyImageData } from 'gatsby-plugin-image'
import { Copy, Item } from './common'

export interface PersonItem extends Item {
	createdAt: string
	email: string
	facebook: string
	github: string
	image: IGatsbyImageData
	name: string
	shortBio: Copy
	twitter: string
	__typename: 'ContentfulPerson'
}
