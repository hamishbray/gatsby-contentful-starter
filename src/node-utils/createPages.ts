import { GatsbyNode } from 'gatsby'
import { createBlogPages } from './blogPages'

export const createPages: GatsbyNode['createPages'] = async ({
	graphql,
	actions: { createPage },
	reporter,
}) => {
	await createBlogPages(createPage, graphql, reporter)
}
