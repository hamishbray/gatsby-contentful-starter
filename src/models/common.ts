import { IGatsbyImageData } from 'gatsby-plugin-image'
import { ContentfulRichTextGatsbyReference } from 'gatsby-source-contentful/rich-text'
import { ArticleItem } from './article'
import { BlogItem } from './blog'

export const CONTENTFUL_ARTICLE_TYPENAME = 'ContentfulArticle'
export const CONTENTFUL_BLOGPOST_TYPENAME = 'ContentfulBlogPost'
export const CONTENTFUL_PERSON_TYPENAME = 'ContentfulPerson'

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
	(item as ArticleItem).__typename === CONTENTFUL_ARTICLE_TYPENAME

export const isBlogItem = (item: GenericItem): item is BlogItem =>
	(item as BlogItem).__typename === CONTENTFUL_BLOGPOST_TYPENAME

export const getType = (typeName: string): string => {
	switch (typeName) {
		case CONTENTFUL_ARTICLE_TYPENAME:
			return 'article'
		case CONTENTFUL_BLOGPOST_TYPENAME:
			return 'blog'
		case CONTENTFUL_PERSON_TYPENAME:
			return 'person'
		default:
			return ''
	}
}
