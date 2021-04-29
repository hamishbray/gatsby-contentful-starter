import { resolve } from 'path'
import { Reporter } from 'gatsby'

import { AllContentResult } from './types'
import { BCProductItem } from '../models/product'

export const createProductPages = async (
	createPage: any,
	graphql: any,
	reporter: Reporter
) => {
	const result: AllContentResult<BCProductItem, 'allProducts'> = await graphql(`
		{
			allProducts: allBigCommerceProduct {
				nodes {
					custom_url {
						url
					}
					name
				}
			}
		}
	`)

	if (result.errors) {
		reporter.panicOnBuild(`Error while running Product GraphQL query.`)
		return
	}

	// Product Pages
	result.data?.allProducts.nodes.forEach(product =>
		createPage({
			path: `/product${product.custom_url.url}`,
			component: resolve(`src/templates/product.tsx`),
			context: {
				...product,
				slug: product.custom_url.url,
			},
		})
	)
}
