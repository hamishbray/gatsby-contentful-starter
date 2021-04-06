// @ts-nocheck - lots of unknown types below. e.g. node.elements
import { GatsbyNode } from 'gatsby'
import crypto from 'crypto'

export const onCreateNode: GatsbyNode['onCreateNode'] = ({
	node,
	actions: { createNode, createParentChildLink },
	createNodeId,
}) => {
	const createSearchableItemNode = (typeFieldData: Object): void => {
		const fieldData = {
			modified: node.updatedAt,
			modified_unix: toUnix(node.updatedAt),
			published: node.publishDate,
			published_unix: toUnix(node.publishDate),
			type: node.internal.type,
			...typeFieldData,
		}

		const nodeData = {
			...fieldData,
			id: createNodeId(`${node.id}__SearchableItem`),
			parent: node.id,
			children: [],
			internal: {
				type: 'SearchableItem',
				contentDigest: crypto
					.createHash(`md5`)
					.update(JSON.stringify(fieldData))
					.digest(`hex`),
			},
		}

		createNode(nodeData)
		createParentChildLink({ parent: node, child: nodeData })
	}

	let typeFieldData = {}

	switch (node.internal.type) {
		case 'ContentfulBlogPost':
			typeFieldData = {
				content: node.body?.childMarkdownRemark.html ?? 'Content',
				summary: node.description?.childMarkdownRemark.html ?? 'Summary',
				title: node.title,
				imageUrl: node.heroImage?.file.url,
				tags: node.tags,
				url: `/blog/${node.slug}`,
			}
			createSearchableItemNode(typeFieldData)
			break
	}
}

const toUnix = (date: string): string => Math.floor(new Date(date) / 1000)

export default onCreateNode
