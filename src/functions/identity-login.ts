import {
	Handler,
	HandlerContext,
	HandlerEvent,
	HandlerResponse,
} from '@netlify/functions'

export const handler: Handler = async (
	event: HandlerEvent,
	context: HandlerContext
): Promise<HandlerResponse> => {
	const { identity, user } = context.clientContext || {}
	console.log(`user signed in:`, user)

	return {
		statusCode: 200,
		body: JSON.stringify({
			message: `user: ${JSON.stringify(user)}`,
		}),
	}
}
