import { IGatsbyImageData } from 'gatsby-plugin-image'
import { ContentfulRichTextGatsbyReference } from 'gatsby-source-contentful/rich-text'
import { ArticleItem } from './article'
import { BlogItem } from './blog'

export interface Asset extends ContentfulRichTextGatsbyReference {
	id: string
	gatsbyImageData: IGatsbyImageData
}

export type Copy = {
	childMarkdownRemark: {
		html: string
	}
}

export const isArticleItem = (
	item: ArticleItem | BlogItem
): item is ArticleItem =>
	(item as ArticleItem).__typename === 'ContentfulArticle'

export const isBlogItem = (item: ArticleItem | BlogItem): item is BlogItem =>
	(item as BlogItem).__typename === 'ContentfulBlogPost'
