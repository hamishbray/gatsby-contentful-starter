import {
	Handler,
	HandlerContext,
	HandlerEvent,
	HandlerResponse,
} from '@netlify/functions'

export const handler: Handler = async (
	event: HandlerEvent,
	context: HandlerContext
): Promise<HandlerResponse> => ({
	statusCode: 200,
	body: JSON.stringify({
		message: `Hello world ${Math.floor(Math.random() * 10)}`,
	}),
})
