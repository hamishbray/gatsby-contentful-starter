import { IGatsbyImageData } from 'gatsby-plugin-image'
import { RenderRichTextData } from 'gatsby-source-contentful/rich-text'
import { Asset, Copy, Item } from './common'

export interface ArticleItem extends Item {
	bodyCopy: RenderRichTextData<ArticleItem | Asset>
	postDate: string
	relatedArticles: ArticleItem[]
	summary: Copy
	teaserImage: IGatsbyImageData
	__typename: 'ContentfulArticle'
}
