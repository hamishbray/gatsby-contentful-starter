import { IGatsbyImageData } from 'gatsby-plugin-image'

type BodyCopy = {
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
	body?: BodyCopy
	heroImage?: IGatsbyImageData
	publishDate: string
	slug: string
	tags?: string[]
	title: string
}
