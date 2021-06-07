import React, { useEffect } from 'react'
import { graphql, Link } from 'gatsby'
import { getImage, GatsbyImage } from 'gatsby-plugin-image'

import { HeroImageItem } from '../models/heroImage'
import { ImageItem } from '../models/image'
import { AllContentfulItem, GenericContentfulResult } from '../node-utils/types'

import Layout from '../components/layout'
import SEO from '../components/seo'
import SearchBox from '../components/searchBox'
import Gallery from '../components/gallery'

type Data = {
	imageItem: HeroImageItem
} & AllContentfulItem<ImageItem, 'gallery'>

type Props = GenericContentfulResult<Data>

const IndexPage: React.FC<Props> = ({ data }: Props) => {
	const { title, image } = data?.imageItem ?? ({} as HeroImageItem)

	const heroImage = getImage(image)

	const gallery = data?.gallery.nodes

	// useEffect(() => {
	// 	const SayHello = async () => {
	// 		const response = await fetch('/.netlify/functions/hello')
	// 		const message = await response.json()
	// 		console.log(message)
	// 	}
	// 	SayHello()
	// }, [])

	return (
		<>
			{heroImage && (
				<div className="fixed w-screen min-w-full min-h-screen -z-1">
					<GatsbyImage
						className="min-w-full min-h-screen"
						image={heroImage}
						alt={title}
						loading="eager"
					/>
				</div>
			)}
			<Layout bgTransparent={true}>
				<SEO title="Home" />
				<div className="z-10 text-white">
					<h1>Welcome!</h1>
					<div className="mb-8">
						<SearchBox />
					</div>
					<Link to="/blog/">Blogs</Link> | <Link to="/article">Articles</Link>
					{gallery && <Gallery gallery={gallery} />}
				</div>
			</Layout>
		</>
	)
}

export default IndexPage

export const query = graphql`
	{
		imageItem: contentfulHeroImage(title: { eq: "Road to Know Where" }) {
			title
			description
			image {
				gatsbyImageData(layout: FULL_WIDTH, backgroundColor: "#555")
			}
		}
		gallery: allContentfulImage(limit: 3) {
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
