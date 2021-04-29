type BCProductImage = {
	description: string
	is_thumbnail: boolean
	url_standard: string
	url_thumbnail: string
}

type BCCustomUrl = {
	is_customized: boolean
	url: string
}

export interface BCProductItem {
	availability: 'available' | 'unavailable'
	base_variant_id: number
	bigcommerce_id: number
	calculated_price: number
	categories: number[]
	custom_url: BCCustomUrl
	date_modified: string
	description: string
	id: string
	images: BCProductImage[]
	name: string
	price: number
	reviews_count: number
	reviews_rating_sum: number
	sku: string
	type: 'digital' | 'physical'
	view_count: number
}
