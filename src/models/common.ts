import { IGatsbyImageData } from 'gatsby-plugin-image'
import { ContentfulRichTextGatsbyReference } from 'gatsby-source-contentful/rich-text'

export interface Asset extends ContentfulRichTextGatsbyReference {
	id: string
	gatsbyImageData: IGatsbyImageData
}

export type Copy = {
	childMarkdownRemark: {
		html: string
	}
}
