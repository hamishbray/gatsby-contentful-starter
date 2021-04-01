import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'
import SearchBox from '../components/searchBox'

const IndexPage: React.FC = () => {
	return (
		<Layout>
			<SEO title="Home" />
			<h1>Welcome!</h1>
			<div className="mb-8">
				<SearchBox />
			</div>
			<Link to="/blogs/">Blogs</Link>
		</Layout>
	)
}

export default IndexPage
