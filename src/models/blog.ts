import { IGatsbyImageData } from 'gatsby-plugin-image'

type BodyCopy = {
	childMarkdownRemark: {
		html: string
	}
}

export interface BlogItem {
	body?: BodyCopy
	slug: string
	title: string
	heroImage?: IGatsbyImageData
}
