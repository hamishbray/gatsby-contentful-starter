import { IGatsbyImageData } from 'gatsby-plugin-image'
import { Copy } from './common'

export interface PersonItem {
	createdAt: string
	email: string
	facebook: string
	github: string
	image: IGatsbyImageData
	name: string
	shortBio: Copy
	slug: string
	title: string
	twitter: string
	updatedAt: string
}
