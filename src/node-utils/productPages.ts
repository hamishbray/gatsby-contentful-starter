import { resolve } from 'path'
import { Reporter } from 'gatsby'

import { AllContentfulResult } from './types'
import { ProductItem } from '../models/product'

export const createProductPages = async (
	createPage: any,
	graphql: any,
	reporter: Reporter
) => {
	const result: AllContentfulResult<
		ProductItem,
		'allProducts'
	> = await graphql(`
		{
			allProducts: allShopifyProduct(
				filter: { availableForSale: { eq: true } }
			) {
				nodes {
					slug: handle
					title
				}
			}
		}
	`)

	if (result.errors) {
		reporter.panicOnBuild(`Error while running Product GraphQL query.`)
		return
	}

	// Product Pages
	result.data?.allProducts.nodes.forEach(product => {
		createPage({
			path: `/product/${product.slug}`,
			component: resolve(`src/templates/product.tsx`),
			context: {
				...product,
			},
		})
	})
}
