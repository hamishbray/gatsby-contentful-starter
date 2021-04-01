import React from 'react'
import { Link } from 'gatsby'

type Props = {
	siteTitle: string
}

const Header = ({ siteTitle }: Props) => (
	<header className="mb-6 bg-yellow-900">
		<div className="flex max-w-screen-lg px-4 py-8 mx-auto">
			<div className="inline">
				<img src="/images/contentful.svg" alt="Contentful Logo" />
			</div>
			<div className="inline text-4xl">
				<Link to="/" className="text-white no-underline">
					{siteTitle}
				</Link>
			</div>
			<nav className="inline pl-8 text-white"></nav>
		</div>
	</header>
)

export default Header
