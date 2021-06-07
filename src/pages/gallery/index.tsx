import React from 'react'
import { graphql, Link } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

import Layout from '../../components/layout'
import SEO from '../../components/seo'

import { AllContentfulResult } from '../../node-utils/types'
import { ImageItem } from '../../models/image'

import * as styles from './gallery.module.css'

type Props = AllContentfulResult<ImageItem, 'gallery'>

const Gallery: React.FC<Props> = ({ data }: Props) => {
	const images = data?.gallery.nodes ?? []

	return (
		<Layout>
			<SEO title="Photo Gallery" />
			<>
				<div className={styles.heading}>
					<h1>Image Gallery</h1>
				</div>
				{images?.map(({ title, description, media }, index) => {
					const image = getImage(media)

					return image ? (
						<div key={index}>
							<div className="">
								<h2>{title}</h2>
							</div>
						</div>
					) : null
				})}
			</>
		</Layout>
	)
}

export default Gallery

export const query = graphql`
	{
		gallery: allContentfulImage {
			nodes {
				description
				media {
					gatsbyImageData(width: 480, height: 853)
				}
				title
				__typename
			}
		}
	}
`
