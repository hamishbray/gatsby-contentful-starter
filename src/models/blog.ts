import { IGatsbyImageData } from 'gatsby-plugin-image'

type Copy = {
	childMarkdownRemark: {
		html: string
	}
}

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
}
