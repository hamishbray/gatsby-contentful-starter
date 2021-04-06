require('dotenv').config({
	path: `.env.${process.env.NODE_ENV}`,
})

export const siteMetadata = {
	title: 'Gatsby Contentful POC',
	description: 'Gatsby starter site with Contentful source',
	author: '@hamishbray',
}

export const flags = {
	FAST_DEV: true,
}

const queries = [
	{
		query: `
			{
				allContentfulBlogPost {
					nodes {
						body {
							childMarkdownRemark {
								html
							}
						}
						description {
							childMarkdownRemark {
								html
							}
						}
						heroImage {
							file {
								url
							}
							gatsbyImageData(width: 250)
						}
						objectID: id
						published: publishDate
						tags
						title
						modified: updatedAt
					}
				}
			}
		`,
		settings: {
			searchableAttributes: ['title', 'content', 'summary', 'tags'],
			attributesForFaceting: ['tags'],
		},
		transformer: ({ data }: { data: any }) =>
			data.allContentfulBlogPost.nodes.map((node: any) => {
				node.content = node.body?.childMarkdownRemark.html
				node.summary = node.description?.childMarkdownRemark.html
				node.image = node.heroImage?.file.url
				return node
			}),
	},
]

export const plugins = [
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
]
