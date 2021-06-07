import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import '@reach/tabs/styles.css'
import 'sal.js/dist/sal.css'

import Header from './header'

type Props = {
	bgTransparent?: boolean
	children: any
}

const Layout: React.FC<Props> = ({ children, bgTransparent }: Props) => {
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
		<>
			<Header
				siteTitle={data.site.siteMetadata?.title || ``}
				bgTransparent={bgTransparent}
			/>
			<div className="box-border z-10 max-w-screen-lg px-4 pb-8 mx-auto pt-28">
				<main>{children}</main>
				<footer
					className={`mt-8 flex justify-end${
						bgTransparent ? ' text-white' : ''
					}`}
				>
					© {new Date().getFullYear()}
				</footer>
			</div>
		</>
	)
}

export default Layout
