import { AllContentfulResult } from './types'
import { ArticleItem } from '../models/article'
import { BlogItem } from '../models/blog'
import { PersonItem } from '../models/person'

const articleQuery = {
	query: `
		{
			allArticles: allContentfulArticle {
				nodes {
					objectID: id
					published: postDate
					slug
					summary {
						childMarkdownRemark {
							html
						}
					}
					image: teaserImage {
						file {
							url
						}
						gatsbyImageData(width: 225, height: 150)
					}
					title
					modified: updatedAt
				}
			}
		}
	`,
	settings: {
		searchableAttributes: ['title', 'content', 'summary'],
		attributesForFaceting: ['type'],
	},
	transformer: ({ data }: AllContentfulResult<ArticleItem, 'allArticles'>) =>
		data?.allArticles.nodes.map((node: any) => {
			node.summary = node.summary?.childMarkdownRemark.html
			node.thumbnail = node.image?.file.url
			node.url = `/article/${node.slug}`
			node.type = 'Article'
			return node
		}),
}

const blogQuery = {
	query: `
		{
			allBlogs: allContentfulBlogPost {
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
					image: heroImage {
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
	transformer: ({ data }: AllContentfulResult<BlogItem, 'allBlogs'>) =>
		data?.allBlogs.nodes.map((node: any) => {
			node.content = node.body?.childMarkdownRemark.html
			node.summary = node.description?.childMarkdownRemark.html
			node.thumbnail = node.image?.file.url
			node.url = `/blog/${node.slug}`
			node.type = 'Blog Post'
			return node
		}),
}

const personQuery = {
	query: `
		{
			allPeople: allContentfulPerson {
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
					image {
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
	transformer: ({ data }: AllContentfulResult<PersonItem, 'allPeople'>) =>
		data?.allPeople.nodes.map((node: any) => {
			node.summary = node.shortBio?.childMarkdownRemark.html
			node.thumbnail = node.image?.file.url
			node.url = `/person/${node.slug}`
			node.type = 'Person'
			return node
		}),
}

export const queries = [articleQuery, blogQuery, personQuery]
