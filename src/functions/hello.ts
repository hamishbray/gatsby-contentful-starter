import { Context, APIGatewayEvent } from 'aws-lambda'

export const handler = async (event: APIGatewayEvent, context: Context) => ({
	statusCode: 200,
	body: JSON.stringify({
		message: `Hello world ${Math.floor(Math.random() * 10)}`,
	}),
})
