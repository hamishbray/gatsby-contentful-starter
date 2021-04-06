import React from 'react'
import { Link } from 'gatsby'

import logo from '../images/contentful-logo.svg'

type Props = {
	siteTitle: string
}

const Header = ({ siteTitle }: Props) => (
	<header className="mb-6 bg-yellow-900">
		<div className="flex max-w-screen-lg px-4 py-8 mx-auto">
			<div className="inline-flex mr-3">
				<img className="h-10" src={logo} alt="Contentful Logo" />
			</div>
			<div className="inline-flex text-4xl">
				<Link to="/" className="text-white no-underline">
					{siteTitle}
				</Link>
			</div>
			<nav className="inline pl-8 text-white"></nav>
		</div>
	</header>
)

export default Header
