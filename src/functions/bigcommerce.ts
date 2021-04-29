require('dotenv').config({
	path: `.env.${process.env.NODE_ENV}`,
})

import axios, { AxiosResponse } from 'axios'
import cookie from 'cookie'
import setCookie from 'set-cookie-parser'

import {
	Handler,
	HandlerContext,
	HandlerEvent,
	HandlerResponse,
} from '@netlify/functions'

// only log in development mode
const devModeLog = (str?: string, optionalParams: any | string = '') =>
	process.env.NODE_ENV !== 'production' && console.log(str, optionalParams)

// Get env var values we need to speak to the BC API
const API_STORE_HASH = process.env.BIGCOMMERCE_STORE_HASH as string
const API_CLIENT_ID = process.env.BIGCOMMERCE_CLIENT_ID as string
const API_TOKEN = process.env.BIGCOMMERCE_ACCESS_TOKEN as string
const API_SECRET = process.env.BIGCOMMERCE_CLIENT_SECRET as string
const CORS_ORIGIN = process.env.CORS_ORIGIN as string

export const handler: Handler = (event, context, callback) => {
	devModeLog(' ')
	devModeLog('-----------------------')
	devModeLog('----- New Request -----')
	devModeLog('-----------------------')

	// Set up headers
	const REQUEST_HEADERS = {
		'X-Auth-Client': API_CLIENT_ID,
		'X-Auth-Token': API_TOKEN,
		'X-Client-Type': 'Gatsby',
		'X-Client-Name': 'gatsby-contentful-starter',
		'X-Plugin-Version': '1.0.0',
		Accept: 'application/json',
	}
	const CORS_HEADERS = {
		'Access-Control-Allow-Headers': 'Content-Type, Accept',
		'Access-Control-Allow-Credentials': 'true',
		'Access-Control-Allow-Origin': CORS_ORIGIN,
		'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE, OPTIONS',
	}
	// Get endpoint value from query string
	const ENDPOINT_QUERY_STRING = event.queryStringParameters?.endpoint

	// Parse out cookies and change endpoint to include cartId for certain cart requests
	const cookies = setCookie.parse(event.headers.cookie as string, {
		decodeValues: true, // default: true
		map: true, // default: false
	})
	const hasCartIdCookie = cookies.hasOwnProperty('cartId')
	devModeLog(`- hasCartIdCookie? ${hasCartIdCookie.toString()} -`)

	// Assemble BC API URL
	const constructURL = () => {
		let ROOT_URL = `https://api.bigcommerce.com/stores/${API_STORE_HASH}/v3/`
		if (ENDPOINT_QUERY_STRING === 'carts/items') {
			if (hasCartIdCookie) {
				if (typeof event.queryStringParameters?.itemId != 'undefined') {
					return `${ROOT_URL}carts/${cookies.cartId.value}/items/${event.queryStringParameters.itemId}?include=redirect_urls`
				} else {
					return `${ROOT_URL}carts/${cookies.cartId.value}/items?include=redirect_urls`
				}
			} else {
				// If there is no cartId cookie when adding cart items, resort to creating the cart
				return `${ROOT_URL}carts?include=redirect_urls`
			}
		} else if (ENDPOINT_QUERY_STRING === 'carts') {
			if (hasCartIdCookie) {
				return `${ROOT_URL}carts/${cookies.cartId.value}?include=redirect_urls`
			} else {
				return `${ROOT_URL}carts?include=redirect_urls`
			}
		} else {
			return ROOT_URL + ENDPOINT_QUERY_STRING
		}
	}
	// Function to determine return cookie header that should be returned with response
	const setCookieHeader = (responseType: string, response: AxiosResponse) => {
		let cookieHeader = null

		devModeLog('(in setCookieHeader function) responseType: ', responseType)
		devModeLog(
			'(in setCookieHeader function) ENDPOINT_QUERY_STRING: ',
			ENDPOINT_QUERY_STRING
		)
		//devModeLog('(in setCookieHeader function) response: ', response)

		const statusCode = response?.status
		const body = response?.data

		if (ENDPOINT_QUERY_STRING === 'carts' && statusCode === 404) {
			cookieHeader = {
				'Set-Cookie': cookie.serialize('cartId', '', {
					maxAge: -1,
				}),
			}
			devModeLog('- Expiring cardId cookieHeader: -')
			devModeLog('', cookieHeader)
		} else if (responseType === 'response') {
			if (!hasCartIdCookie && body.data.id) {
				cookieHeader = {
					'Set-Cookie': cookie.serialize('cartId', body.data.id, {
						maxAge: 60 * 60 * 24 * 28, // 4 weeks
					}),
				}
				devModeLog('- Assigning cookieHeader: -')
				devModeLog('', cookieHeader)
			}
		}

		return cookieHeader
	}

	// Here's a function we'll use to define how our response will look like when we callback
	const pass = (response: AxiosResponse, cookieHeader?: any) =>
		callback(null, {
			statusCode: response.status,
			body: JSON.stringify(response.data),
			headers: { ...CORS_HEADERS, ...cookieHeader },
		})

	// Process POST
	const post = (body: string) => {
		const url = constructURL()
		devModeLog('- post url: ', url)
		devModeLog('- post body: ', body)

		axios
			.post(url, body, { headers: REQUEST_HEADERS })
			.then(response => {
				const cookieHeader = setCookieHeader('response', response)

				pass(response, cookieHeader)
			})
			.catch(err => pass(err.response))
	}

	if (event.httpMethod === 'POST') {
		devModeLog('--------')
		devModeLog('- POST -')
		devModeLog('--------')
		post(JSON.parse(event.body as string))
	}

	// Process GET
	const get = () => {
		const url = constructURL()
		devModeLog('- get url: ', url)
		axios
			.get(url, { headers: REQUEST_HEADERS })
			.then(response => {
				const cookieHeader = setCookieHeader('response', response)

				pass(response, cookieHeader)
			})
			.catch(err => {
				//devModeLog('- get error: -')
				//devModeLog(err)
				const cookieHeader = setCookieHeader('error', err.response)

				pass(err.response, cookieHeader)
			})
	}

	if (event.httpMethod === 'GET') {
		devModeLog('-------')
		devModeLog('- GET -')
		devModeLog('-------')
		get()
	}

	// Process PUT
	const put = (body: string) => {
		axios
			.put(constructURL(), body, { headers: REQUEST_HEADERS })
			.then(response => {
				pass(response)
			})
			.catch(err => pass(err.response))
	}

	if (event.httpMethod === 'PUT') {
		devModeLog('-------')
		devModeLog('- PUT -')
		devModeLog('-------')
		put(JSON.parse(event.body as string))
	}

	// Process DELETE
	const del = () => {
		const url = constructURL()
		devModeLog('- delete url: ', url)
		axios
			.delete(url, { headers: REQUEST_HEADERS })
			.then(response => {
				pass(response)
			})
			.catch(err => pass(err.response))
	}
	if (event.httpMethod === 'DELETE') {
		devModeLog('----------')
		devModeLog('- DELETE -')
		devModeLog('----------')
		del()
	}
}
