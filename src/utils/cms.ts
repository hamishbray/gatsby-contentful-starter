import { createClient, ClientAPI } from 'contentful-management'
import { Environment } from 'contentful-management/dist/typings/export-types'

const getContentfulClient = (): ClientAPI =>
	createClient({
		accessToken: process.env.CONTENTFUL_CONTENT_MANAGEMENT_ACCESS_TOKEN ?? '',
	})

const getEnvironment = async (): Promise<Environment> => {
	const client = getContentfulClient()
	const space = await client.getSpace(process.env.CONTENTFUL_SPACE_ID ?? '')
	return await space.getEnvironment('master')
}

export const getArticleContentType = async () => {
	//const entries = await environment.getEntries()
	//console.log('entries', entries.items)
	const environment = await getEnvironment()
	const articleContentType = await environment.getContentType('article')
	console.log('article', articleContentType)
}
