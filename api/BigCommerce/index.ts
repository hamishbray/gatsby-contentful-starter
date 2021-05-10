require('dotenv').config({
	path: `.env.${process.env.NODE_ENV}`,
})

import { AzureFunction, Context, HttpRequest } from '@azure/functions'

import axios, { AxiosResponse } from 'axios'
import { serialize } from 'cookie'
import { parse } from 'set-cookie-parser'

// only log in development mode
const devModeLog = (str?: string, optionalParams: any | string = '') =>
	process.env.NODE_ENV !== 'production' && console.log(str, optionalParams)

const httpTrigger: AzureFunction = async function (
	context: Context,
	req: HttpRequest
): Promise<void> {
	context.log('HTTP trigger function processed a request.')
	const name = req.query.name || (req.body && req.body.name)
	const responseMessage = name
		? 'Hello, ' + name + '. This HTTP triggered function executed successfully.'
		: 'This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.'

	context.res = {
		// status: 200, /* Defaults to 200 */
		body: responseMessage,
	}
}

export default httpTrigger
