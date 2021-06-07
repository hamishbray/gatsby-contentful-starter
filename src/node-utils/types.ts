export type ContentfulItem<T> = T & {
	id: string
	internal?: {
		type: string
	}
}

export type AllContentfulItem<T, U extends string> = {
	[u in U]: {
		nodes: ContentfulItem<T>[]
	}
}

export type ContentfulResult<T, N extends string> = {
	errors?: any
	data?: {
		[n in N]: ContentfulItem<T>
	}
}

export type GenericContentfulResult<T> = {
	errors?: any
	data?: T
}

export type AllContentfulResult<T, U extends string> = {
	errors?: any
	data?: AllContentfulItem<T, U>
}
