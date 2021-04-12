import { IGatsbyImageData } from 'gatsby-plugin-image'
import { Copy, Item } from './common'

type Author = {
	name: string
	image: IGatsbyImageData
}

export interface BlogItem extends Item {
	author: Author
	body: Copy
	description: Copy
	heroImage: IGatsbyImageData
	publishDate: string
	tags?: string[]
	__typename: 'ContentfulBlogPost'
}
