import { resolve } from 'path'
import { ElementModels } from '@kentico/kontent-delivery'

import { AccessoryItem } from '../src/generated-models/accessory'

type Fields = {
  slug: string
}

export interface Accessory {
  manufacturer?: string
  price?: number | null | undefined
  productName: string
  productStatus: ElementModels.TaxonomyTerm[]
  longDescription: string
  shortDescription: string
  image?: ElementModels.AssetModel
  slug: string
}

interface Nodes {
  node: {
    fields: Fields
    elements: AccessoryItem
  }
}

interface AllKontentItemAccessory {
  allKontentItemAccessory: {
    edges: Nodes[]
  }
}

interface AllKontentItemAccessoryResult {
  errors?: any
  data?: AllKontentItemAccessory
}

export const createAccessoryPages = async (createPage: any, graphql: any) => {
  const result: AllKontentItemAccessoryResult = await graphql(`
    {
      allKontentItemAccessory {
        edges {
          node {
            fields {
              slug
            }
            elements {
              manufacturer {
                value
              }
              price {
                value
              }
              product_name {
                value
              }
              long_description {
                value
              }
              short_description {
                value
              }
              image {
                value {
                  description
                  url
                }
              }
              url_pattern {
                value
              }
              product_status {
                value {
                  codename
                  name
                }
              }
            }
          }
        }
      }
    }
  `)


  const accessories = result.data?.allKontentItemAccessory.edges.map(
    ({ node }) => parseAccessory(node.elements)
  )

  // All Accessories Page
  createPage({
    path: `/accessories`,
    component: resolve(`src/templates/accessories.tsx`),
    context: {
      accessories,
    },
  })

  // Accessory Pages
  accessories?.forEach(accessory => {
    createPage({
      path: `/accessories/${accessory.slug}`,
      component: resolve(`src/templates/accessory.tsx`),
      context: {
        ...accessory,
      },
    })
  })
}

const parseAccessory = (accessory: AccessoryItem): Accessory => ({
  manufacturer: accessory.manufacturer?.value,
  price: accessory.price?.value,
  productName: accessory.product_name.value,
  productStatus: accessory.product_status.value,
  longDescription: accessory.long_description.value,
  shortDescription: accessory.short_description.value,
  slug: accessory.url_pattern.value,
  image: accessory.image?.value[0],
})
