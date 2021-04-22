import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { IdentityContextProvider } from 'react-netlify-identity'

import '@reach/tabs/styles.css'

import Header from './header'

const netlifyIdentityUrl = process.env.NETLIFY_IDENTITY_URL as string

type Props = {
	children: any
}

const Layout: React.FC<Props> = ({ children }: Props) => {
	const data = useStaticQuery(graphql`
		query SiteTitleQuery {
			site {
				siteMetadata {
					title
				}
			}
		}
	`)

	return (
		<IdentityContextProvider url={netlifyIdentityUrl}>
			<Header siteTitle={data.site.siteMetadata?.title || ``} />
			<div className="box-border max-w-screen-lg px-4 py-8 mx-auto">
				<main>{children}</main>
				<footer className="mt-8">© {new Date().getFullYear()}</footer>
			</div>
		</IdentityContextProvider>
	)
}

export default Layout
