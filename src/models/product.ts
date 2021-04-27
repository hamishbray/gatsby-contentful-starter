import { IGatsbyImageData } from 'gatsby-plugin-image'

type ShopifyImage = {
	localFile: {
		childrenImageSharp: {
			gatsbyImageData: IGatsbyImageData
		}
	}
}

type ShopifyPrice = {
	amount: string
	currencyCode: string
}

type ShopifyVariant = {
	availableForSale: boolean
	id: string
	image: ShopifyImage
	price: string
	priveV2: ShopifyPrice
	shopifyId: string
	sku: string
}

export interface ProductItem {
	availableForSale: boolean
	createdAt: string
	descriptionHtml: string
	id: string
	images: ShopifyImage[]
	productType: string
	publishedAt: string
	shopifyId: string
	slug: string
	tags: string[]
	title: string
	variants: ShopifyVariant[]
}
