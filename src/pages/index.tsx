import React, { useEffect } from 'react'
import { Link } from 'gatsby'
import { Personalize, Variant } from '@ninetailed/client-sdk-react'

import Layout from '../components/layout'
import SEO from '../components/seo'
import Headline from '../components/headline'
import SearchBox from '../components/searchBox'

const IndexPage: React.FC = () => {
	useEffect(() => {
		const SayHello = async () => {
			const response = await fetch('/.netlify/functions/hello')
			const message = await response.json()
			console.log(message)
		}
		SayHello()
	}, [])

	const variants: Variant<{ text: string }>[] = [
		{
			id: 'returning-user',
			audience: {
				id: 'Jc2qq47Qvlrllw9QMYHlq',
			},
			text: 'Welcome Back',
		},
	]

	return (
		<Layout>
			<SEO title="Home" />
			<Personalize
				id="headline"
				component={Headline}
				variants={variants}
				text="Welcome"
			/>
			<div className="mb-8">
				<SearchBox />
			</div>
			<Link to="/blog/">Blogs</Link> | <Link to="/article">Articles</Link>
		</Layout>
	)
}

export default IndexPage
