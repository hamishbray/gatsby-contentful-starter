import React, { ReactNode } from 'react'
import { Link } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import {
	Block,
	Inline,
	BLOCKS,
	INLINES,
	MARKS,
} from '@contentful/rich-text-types'
import {
	renderRichText,
	ContentfulRichTextGatsbyReference,
	RenderRichTextData,
} from 'gatsby-source-contentful/rich-text'

const Bold = ({ children }: { children: ReactNode }) => (
	<span className="font-bold">{children}</span>
)

const Code = ({ children }: { children: ReactNode }) => (
	<pre className="my-2">{children}</pre>
)

const EmbeddedEntry = ({ node }: { node: Inline | Block }) => (
	<Link to={`/article/${node.data.target.slug}`}>{node.data.target.title}</Link>
)

const EmbeddedAsset = ({ node }: { node: Inline | Block }) => {
	const { contentful_id, description, gatsbyImageData } = node.data.target
	const image = getImage(gatsbyImageData)
	return image ? (
		<GatsbyImage
			className="my-8"
			alt={description || contentful_id}
			image={image}
		/>
	) : null
}

const options = {
	renderMark: {
		[MARKS.BOLD]: (text: ReactNode) => <Bold>{text}</Bold>,
		[MARKS.CODE]: (text: ReactNode) => <Code>{text}</Code>,
	},
	renderNode: {
		[INLINES.EMBEDDED_ENTRY]: (node: Inline | Block) => (
			<EmbeddedEntry node={node} />
		),
		[BLOCKS.EMBEDDED_ASSET]: (node: Inline | Block) => (
			<EmbeddedAsset node={node} />
		),
	},
}

export function getRichText<T extends ContentfulRichTextGatsbyReference>(
	bodyCopy: RenderRichTextData<T>
): ReactNode {
	return renderRichText(bodyCopy, options)
}
