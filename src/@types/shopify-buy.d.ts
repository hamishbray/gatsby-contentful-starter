import 'shopify-buy'

declare module 'shopify-buy' {
	export interface CheckoutResource {
		updateLineItems(
			checkoutId: string | number,
			lineItems: AttributeInput[]
		): Promise<Cart>

		updateAttributes(
			checkoutId: string | number,
			input: { customAttributes: CustomAttribute[] }
		): Promise<Cart>
	}

	export interface VariableValues {
		id: string | number
	}

	export interface CustomAttribute {
		key: string
		value: string
	}

	export interface Product {
		id: string | number
		handle: string
	}

	export interface UnitPriceMeasurement {
		measuredType: string
		quantityUnit: string
		quantityValue: number
		referenceUnit: string
		referenceValue: number
	}

	export interface SelectedOptions {
		name: string
		value: string
	}

	export interface Image {
		id: string | number
		src: string
		altText: string
	}

	export interface CompareAtPriceV2 {
		amount: string
		currencyCode: string
	}

	export interface CompareAtPrice {
		amount: string
		currencyCode: string
	}

	export interface Price {
		amount: string
		currencyCode: string
	}

	export interface PresentmentPrices {
		hasNextPage: boolean
		hasPreviousPage: boolean
		variableValues: VariableValues

		compareAtPrice: CompareAtPrice
		price: Price
	}

	export interface PriceV2 {
		amount: string
		currencyCode: string
	}

	export interface Variant {
		id: string | number
		title: string
		price: string
		weight: number
		available: boolean
		sku: string
		compareAtPrice: string
		unitPrice: string

		product: Product
		unitPriceMeasurement: UnitPriceMeasurement
		selectedOptions: [SelectedOptions]
		image: Image
		compareAtPriceV2: CompareAtPriceV2
		presentmentPrices: [PresentmentPrices]
		priceV2: PriceV2
	}

	export interface LineItems {
		id: string | number
		title: string
		quantity: number
		hasNextPage: boolean
		hasPreviousPage: boolean
		variableValues: VariableValues

		discountAllocations: [string]
		customAttributes: [CustomAttribute]
		variant: Variant
	}

	export interface TotalPriceV2 {
		amount: string
		currencyCode: string
	}

	export interface SubtotalPriceV2 {
		amount: string
		currencyCode: string
	}

	export interface LineItemsSubtotalPrice {
		amount: string
		currencyCode: string
	}

	export interface TotalTaxV2 {
		amount: string
		currencyCode: string
	}

	export interface PaymentDueV2 {
		amount: string
		currencyCode: string
	}

	export interface Cart {
		id: string | number
		ready: boolean
		requiresShipping: boolean
		note: string
		paymentDue: string
		webUrl: string
		orderStatusUrl: string
		taxExempt: boolean
		taxesIncluded: boolean
		currencyCode: string
		totalTax: string
		subtotalPrice: string
		totalPrice: string
		completedAt: string | null
		createdAt: string
		updatedAt: string
		email: string
		shippingAddress: string
		shippingLine: string
		order: string
		lineItems: LineItem[]
		customAttributes: [string]
		appliedGiftCards: [string]
		discountApplications: [string]
		totalPriceV2: TotalPriceV2
		subtotalPriceV2: SubtotalPriceV2
		lineItemsSubtotalPrice: LineItemsSubtotalPrice
		totalTaxV2: TotalTaxV2
		paymentDueV2: PaymentDueV2
	}
}
