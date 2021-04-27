import { GatsbyNode } from 'gatsby'
import { createArticlePages } from './articlePages'
import { createBlogPages } from './blogPages'
import { createProductPages } from './productPages'

export const createPages: GatsbyNode['createPages'] = async ({
	graphql,
	actions: { createPage },
	reporter,
}) => {
	await createArticlePages(createPage, graphql, reporter)
	await createBlogPages(createPage, graphql, reporter)
	await createProductPages(createPage, graphql, reporter)
}
