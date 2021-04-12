import { IGatsbyImageData } from 'gatsby-plugin-image'
import { ContentfulRichTextGatsbyReference } from 'gatsby-source-contentful/rich-text'
import { ArticleItem } from './article'
import { BlogItem } from './blog'

export type AssetFile = {
	contentType: string
	url: string
	fileName: string
}

export type Copy = {
	childMarkdownRemark: {
		html: string
	}
}

// used as umbrella type for all item types
export type GenericItem = ArticleItem | BlogItem

export interface Item extends ContentfulRichTextGatsbyReference {
	id: string
	slug: string
	title: string
	updatedAt: string
}

export interface Asset extends ContentfulRichTextGatsbyReference {
	id: string
	description: string
	file: AssetFile
	gatsbyImageData: IGatsbyImageData | null
}

export const isArticleItem = (item: GenericItem): item is ArticleItem =>
	(item as ArticleItem).__typename === 'ContentfulArticle'

export const isBlogItem = (item: GenericItem): item is BlogItem =>
	(item as BlogItem).__typename === 'ContentfulBlogPost'
