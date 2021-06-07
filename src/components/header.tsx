import React, { useRef, useState } from 'react'
import { Link } from 'gatsby'
import { useIdentityContext } from 'react-netlify-identity-widget'

import { useScrollPosition } from '../hooks/useScrollPosition'

import logo from '../images/contentful-logo.svg'

type Props = {
	siteTitle: string
	bgTransparent?: boolean
}

const Header: React.FC<Props> = ({ siteTitle, bgTransparent }: Props) => {
	const [showHeader, setShowHeader] = useState(true)
	const { isLoggedIn, logoutUser } = useIdentityContext()
	const headerRef = useRef<HTMLElement>(null)

	const login = () =>
		isLoggedIn ? logoutUser() : window.location.assign('/account/login')

	useScrollPosition({
		scrollEffect: ({ prevPosition, currentPosition }) => {
			if (currentPosition.y === prevPosition.y) return

			const top = currentPosition.y
			const header = headerRef.current

			if (header && bgTransparent) {
				const opacity =
					top >= header.clientHeight ? 1 : top / header.clientHeight
				header.style.backgroundColor = `rgba(17, 24, 39, ${opacity})`
			}

			const show = currentPosition.y < prevPosition.y
			show !== showHeader && setShowHeader(show)
		},
	})

	const headerClasses = showHeader ? 'ease-out' : 'ease-in -translate-y-full'

	return (
		<header
			ref={headerRef}
			className={`fixed text-white top-0 z-20 w-full h-20 transition duration-300 transform ${headerClasses} ${
				bgTransparent ? 'bg-transparent' : 'bg-gray-900'
			}`}
		>
			<div className="flex items-center h-full max-w-screen-lg px-4 py-8 mx-auto">
				<div className="flex flex-1 mr-3">
					<img
						className="h-8 mt-1 mr-3 lg:h-10 md:mt-auto"
						src={logo}
						alt="Contentful Logo"
					/>
					<Link to="/" className="text-2xl no-underline lg:text-4xl">
						{siteTitle}
					</Link>
				</div>
				<nav className="pl-4 md:w-auto md:min-w- h-11">
					<button
						className="inline px-4 py-2 border-2 border-white rounded hover:border-gray-400 hover:text-gray-400"
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
