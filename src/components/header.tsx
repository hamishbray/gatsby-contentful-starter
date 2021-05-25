import React, { useState } from 'react'
import { Link } from 'gatsby'
import { useIdentityContext } from 'react-netlify-identity-widget'

import { useScrollPosition } from '../hooks/useScrollPosition'

import logo from '../images/contentful-logo.svg'

type Props = {
	siteTitle: string
}

const Header: React.FC<Props> = ({ siteTitle }: Props) => {
	const [showHeader, setShowHeader] = useState(true)
	const { isLoggedIn, logoutUser } = useIdentityContext()

	const login = () =>
		isLoggedIn ? logoutUser() : window.location.assign('/account/login')

	useScrollPosition({
		scrollEffect: ({ prevPosition, currentPosition }) => {
			if (currentPosition.y === prevPosition.y) return

			const show = currentPosition.y < prevPosition.y
			show !== showHeader && setShowHeader(show)
		},
	})

	const headerClasses = showHeader
		? 'ease-out delay-200'
		: 'ease-in -translate-y-full'

	return (
		<header
			className={`fixed top-0 z-10 w-full h-20 bg-blue-700 transition-all duration-300 transform ${headerClasses}`}
		>
			<div className="flex items-center h-full max-w-screen-lg px-4 py-8 mx-auto">
				<div className="flex flex-1 mr-3">
					<img
						className="h-8 mt-1 mr-3 lg:h-10 md:mt-auto"
						src={logo}
						alt="Contentful Logo"
					/>
					<Link to="/" className="text-2xl text-white no-underline lg:text-4xl">
						{siteTitle}
					</Link>
				</div>
				<nav className="pl-4 text-white md:w-auto md:min-w- h-11">
					<button
						className="inline px-4 py-2 border-2 border-white rounded hover:border-black hover:text-black"
						onClick={login}
					>
						{isLoggedIn ? `Log out` : `Log In`}
					</button>
				</nav>
			</div>
		</header>
	)
}

export default Header
