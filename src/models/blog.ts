import { IGatsbyImageData } from 'gatsby-plugin-image'
import { Copy } from './common'

type Author = {
	name: string
	image: IGatsbyImageData
}

export interface BlogItem {
	author: Author
	body: Copy
	description: Copy
	heroImage: IGatsbyImageData
	publishDate: string
	slug: string
	tags?: string[]
	title: string
	updatedAt: string
	__typename: 'ContentfulBlogPost'
}
