export type BCListItem = {
	id: string
	variant_id: number
	product_id: number
	sku: string
	name: string
	url: string
	quantity: number
	taxable: boolean
	image_url: string
}

type BCCustomItem = {
	id: string
	sku: string
	name: string
	quantity: number
	list_price: number
	extended_list_price: number
}

type BCGiftCertificateTheme =
	| 'Birthday'
	| 'Boy'
	| 'Celebration'
	| 'Christmas'
	| 'General'
	| 'Girl'

type BCEmail = {
	name: string
	email: string
}

type BCGiftCertificate = {
	id: string
	name: string
	theme: BCGiftCertificateTheme
	amount: number
	is_taxable: boolean
	sender: BCEmail
	recipient: BCEmail
	message: string
}

type BCDiscount = {
	id: number
	discounted_amount: number
}

type BCLineItems = {
	[key: string]: any[]
	physical_items: BCListItem[]
	digital_items: BCListItem[]
	gift_certificates: BCGiftCertificate[]
	custom_items: BCCustomItem[]
}

export interface BCCart {
	id: string
	parent_id: string
	customer_id: number
	email: string
	currency: {
		code: string
	}
	tax_included: boolean
	base_amount: number
	discount_amount: number
	cart_amount: number
	//coupons
	discounts: BCDiscount[]
	line_items: BCLineItems
	created_time: string
	updated_time: string
	channel_id: number
	locale: string
}
