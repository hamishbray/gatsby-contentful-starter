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

export const isArticleItem = (
	item: ArticleItem | BlogItem
): item is ArticleItem =>
	(item as ArticleItem).__typename === 'ContentfulArticle'

export const isBlogItem = (item: ArticleItem | BlogItem): item is BlogItem =>
	(item as BlogItem).__typename === 'ContentfulBlogPost'
