require('dotenv').config({
	path: `.env.${process.env.NODE_ENV}`,
})

import { GatsbyConfig } from 'gatsby'
import { createProxyMiddleware } from 'http-proxy-middleware'

import { queries } from './src/node-utils/algolia-queries'

const config: GatsbyConfig = {
	developMiddleware: (app: any) => {
		app.use(
			'/api/',
			createProxyMiddleware({
				target: 'http://localhost:7071',
			})
		)
	},
	siteMetadata: {
		title: 'Gatsby Contentful POC',
		description: 'Gatsby starter site with Contentful source',
		author: '@hamishbray',
	},
	flags: {
		FAST_DEV: true,
		PARALLEL_SOURCING: true,
	},
	plugins: [
		'gatsby-plugin-postcss',
		'gatsby-plugin-typescript',
		'gatsby-plugin-react-helmet',
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				name: 'images',
				path: `${__dirname}/src/images`,
			},
		},
		'gatsby-plugin-image',
		`gatsby-transformer-remark`,
		'gatsby-transformer-sharp',
		'gatsby-plugin-sharp',
		{
			resolve: 'gatsby-plugin-manifest',
			options: {
				name: 'gatsby-starter-default',
				short_name: 'starter',
				start_url: '/',
				background_color: '#663399',
				theme_color: '#663399',
				display: 'standalone',
				icon: 'src/images/heat.png', // This path is relative to the root of the site.
			},
		},
		{
			resolve: `gatsby-source-contentful`,
			options: {
				spaceId: process.env.CONTENTFUL_SPACE_ID,
				accessToken:
					process.env.CONTENTFUL_ACCESS_TOKEN ||
					process.env.CONTENTFUL_DELIVERY_TOKEN,
			},
		},
		{
			resolve: `gatsby-plugin-netlify-identity`,
			options: {
				url: process.env.NETLIFY_IDENTITY_URL,
			},
		},
		{
			resolve: `gatsby-source-bigcommerce`,
			options: {
				clientId: process.env.BIGCOMMERCE_CLIENT_ID,
				secret: process.env.BIGCOMMERCE_CLIENT_SECRET,
				accessToken: process.env.BIGCOMMERCE_ACCESS_TOKEN,
				storeHash: process.env.BIGCOMMERCE_STORE_HASH,
				endpoints: {
					BigCommerceProduct: '/catalog/products?include=images',
					BigCommerceCategory: '/catalog/categories',
				},
			},
		},
		{
			resolve: `gatsby-plugin-algolia`,
			options: {
				appId: process.env.GATSBY_ALGOLIA_APP_ID,
				apiKey: process.env.ALGOLIA_API_KEY,
				indexName: process.env.GATSBY_ALGOLIA_INDEX_NAME,
				queries,
				enablePartialUpdates: true,
				matchFields: ['modified'],
			},
		},
		`gatsby-plugin-offline`,
	],
}

module.exports = config
