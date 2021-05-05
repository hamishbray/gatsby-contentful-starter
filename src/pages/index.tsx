import React, { useEffect } from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'
import SearchBox from '../components/searchBox'

const IndexPage: React.FC = () => {
	useEffect(() => {
		const SayHello = async () => {
			const response = await fetch('/.netlify/functions/message')
			const { text } = await response.json()
			console.log(text)
		}
		SayHello()
	}, [])

	return (
		<Layout>
			<SEO title="Home" />
			<h1>Welcome!</h1>
			<div className="mb-8">
				<SearchBox />
			</div>
			<Link to="/blog/">Blogs</Link> | <Link to="/article">Articles</Link>
		</Layout>
	)
}

export default IndexPage
