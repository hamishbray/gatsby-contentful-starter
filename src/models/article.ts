import { IGatsbyImageData } from 'gatsby-plugin-image'
import {
	ContentfulRichTextGatsbyReference,
	RenderRichTextData,
} from 'gatsby-source-contentful/rich-text'
import { Asset, Copy } from './common'

export interface ArticleItem extends ContentfulRichTextGatsbyReference {
	bodyCopy: RenderRichTextData<ArticleItem | Asset>
	id: string
	postDate: string
	relatedArticles: ArticleItem[]
	slug: string
	summary: Copy
	teaserImage: IGatsbyImageData
	title: string
	updatedAt: string
	__typename: 'Article'
}
