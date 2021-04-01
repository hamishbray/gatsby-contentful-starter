import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import '@reach/tabs/styles.css'

import Header from './header'

interface Props {
	children: any
}

const Layout = ({ children }: Props) => {
	const data = useStaticQuery(graphql`
		query SiteTitleQuery {
			allSite {
				nodes {
					siteMetadata {
						title
					}
				}
			}
		}
	`)

	return (
		<>
			<Header siteTitle={data.allSite.nodes.siteMetadata?.title || `Title`} />
			<div className="box-border max-w-screen-lg px-4 py-8 mx-auto">
				<main>{children}</main>
				<footer className="mt-8">© {new Date().getFullYear()}</footer>
			</div>
		</>
	)
}

export default Layout
