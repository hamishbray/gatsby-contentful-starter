export type ContentItem<T> = T & {
	id: string
	internal?: {
		type: string
	}
}

type AllContentItem<T, U extends string> = {
	[u in U]: {
		nodes: ContentItem<T>[]
	}
}

export type ContentResult<T, N extends string> = {
	errors?: any
	data?: {
		[n in N]: ContentItem<T>
	}
}

export type AllContentResult<T, U extends string> = {
	errors?: any
	data?: AllContentItem<T, U>
}
