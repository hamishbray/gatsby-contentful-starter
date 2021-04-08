import { resolve } from 'path'
import { Reporter } from 'gatsby'

import { AllContentfulResult } from './types'
import { ArticleItem } from '../models/article'

export const createArticlePages = async (
	createPage: any,
	graphql: any,
	reporter: Reporter
) => {
	const result: AllContentfulResult<
		ArticleItem,
		'allArticles'
	> = await graphql(`
		{
			allArticles: allContentfulArticle {
				nodes {
					slug
					title
				}
			}
		}
	`)

	if (result.errors) {
		reporter.panicOnBuild(`Error while running Article GraphQL query.`)
		return
	}

	// Article Pages
	result.data?.allArticles.nodes.forEach(article => {
		createPage({
			path: `/article/${article.slug}`,
			component: resolve(`src/templates/article.tsx`),
			context: {
				...article,
			},
		})
	})
}
