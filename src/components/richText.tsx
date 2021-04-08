import React, { ReactNode } from 'react'
import { Link } from 'gatsby'
import {
	Block,
	Inline,
	Text,
	BLOCKS,
	INLINES,
	MARKS,
} from '@contentful/rich-text-types'
import { NodeRenderer } from '@contentful/rich-text-react-renderer'
import {
	renderRichText,
	ContentfulRichTextGatsbyReference,
	RenderRichTextData,
} from 'gatsby-source-contentful/rich-text'

const Bold = ({ children }: { children: ReactNode }) => (
	<span className="font-bold">{children}</span>
)

const options = {
	renderMark: {
		[MARKS.BOLD]: (text: ReactNode) => <Bold>{text}</Bold>,
	},
	renderNode: {
		[BLOCKS.PARAGRAPH]: (node: Inline | Block) => (
			<div className="mb-2">{node.content.map(getTextNode)}</div>
		),
		[INLINES.EMBEDDED_ENTRY]: (node: Inline | Block) => (
			<Link to={`/article/${node.data.target.slug}`}>
				{node.data.target.title}
			</Link>
		),
		// [BLOCKS.EMBEDDED_ASSET]: (node: Inline | Block) => {

		// },
	},
}

const getTextNode = (node: Inline | Block | Text, index: number) => {
	switch (node.nodeType) {
		case INLINES.HYPERLINK:
			return (
				<a key={index} href={node.data.uri}>
					{(node.content[0] as Text).value}
				</a>
			)
		case INLINES.EMBEDDED_ENTRY:
			return (
				<Link key={index} to={`/article/${node.data.target.slug}`}>
					{node.data.target.title}
				</Link>
			)
		case 'text':
			if (node.marks.length > 0) {
				switch (node.marks[0].type) {
					case 'code':
						return (
							<pre key={index} className="my-2">
								<code>{node.value}</code>
							</pre>
						)
				}
			} else {
				return <span key={index}>{node.value}</span>
			}
	}
	return ''
}

export function getRichText<T extends ContentfulRichTextGatsbyReference>(
	bodyCopy: RenderRichTextData<T>
): ReactNode {
	return renderRichText(bodyCopy, options)
}
