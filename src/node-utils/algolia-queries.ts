const blogQuery = {
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
						gatsbyImageData(width: 225, height: 150)
					}
					objectID: id
					published: publishDate
					slug
					tags
					title
					modified: updatedAt
				}
			}
		}
	`,
	settings: {
		searchableAttributes: ['title', 'content', 'summary', 'tags'],
		attributesForFaceting: ['tags', 'type'],
	},
	transformer: ({ data }: { data: any }) =>
		data.allContentfulBlogPost.nodes.map((node: any) => {
			node.content = node.body?.childMarkdownRemark.html
			node.summary = node.description?.childMarkdownRemark.html
			node.image = node.heroImage?.file.url
			node.url = `/blog/${node.slug}`
			node.type = 'Blog Post'
			return node
		}),
}

const personQuery = {
	query: `
		{
			allContentfulPerson {
				nodes {
					published: createdAt
					modified: updatedAt
					title: name
					shortBio {
						childMarkdownRemark {
							html
						}
					}
					objectID: id
					heroImage: image {
						file {
							url
						}
						gatsbyImageData(width: 225, height: 225)
					}
					slug
				}
			}
		}
	`,
	settings: {
		searchableAttributes: ['title', 'summary'],
		attributesForFaceting: ['type'],
	},
	transformer: ({ data }: { data: any }) =>
		data.allContentfulPerson.nodes.map((node: any) => {
			node.summary = node.shortBio?.childMarkdownRemark.html
			node.image = node.heroImage?.file.url
			node.url = `/person/${node.slug}`
			node.type = 'Person'
			return node
		}),
}

export const queries = [blogQuery, personQuery]
