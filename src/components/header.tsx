import React from 'react'
import { Link } from 'gatsby'
import { useIdentityContext } from 'react-netlify-identity-widget'

import logo from '../images/contentful-logo.svg'

import ClientOnly from '../components/clientOnly'

type Props = {
	siteTitle: string
}

const Header: React.FC<Props> = ({ siteTitle }: Props) => {
	const { user, isLoggedIn, logoutUser } = useIdentityContext()
	const name = user?.user_metadata?.full_name ?? 'Mr Nobody'

	const login = () =>
		isLoggedIn ? logoutUser() : window.location.assign('/account/login')

	return (
		<header className="mb-6 bg-blue-700">
			<div className="flex max-w-screen-lg px-4 py-8 mx-auto">
				<div className="flex flex-1 mr-3">
					<img
						className="h-10 mt-1 mr-3 md:mt-auto"
						src={logo}
						alt="Contentful Logo"
					/>
					<Link to="/" className="text-4xl text-white no-underline">
						{siteTitle}
					</Link>
				</div>
				<nav className="pl-4 text-white md:w-auto h-11">
					<ClientOnly>
						<button
							className="inline px-4 py-2 border-2 border-white rounded hover:border-black hover:text-black"
							onClick={login}
						>
							{isLoggedIn ? `Hello ${name}, Log out here!` : `Log In`}
						</button>
					</ClientOnly>
				</nav>
			</div>
		</header>
	)
}

export default Header
