import { resolve } from 'path'
import { Reporter } from 'gatsby'

import { AllContentfulResult } from './types'
import { BlogItem } from '../models/blog'

export const createBlogPages = async (
	createPage: any,
	graphql: any,
	reporter: Reporter
) => {
	const result: AllContentfulResult<BlogItem, 'allBlogs'> = await graphql(`
		{
			allBlogs: allContentfulBlogPost {
				nodes {
					slug
					title
				}
			}
		}
	`)

	if (result.errors) {
		reporter.panicOnBuild(`Error while running Blog GraphQL query.`)
		return
	}

	// Blog Pages
	result.data?.allBlogs.nodes.forEach(blog => {
		createPage({
			path: `/blog/${blog.slug}`,
			component: resolve(`src/templates/blog.tsx`),
			context: {
				...blog,
			},
		})
	})
}
