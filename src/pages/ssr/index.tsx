import React from 'react'

import Layout from '../../components/layout'
import SEO from '../../components/seo'

type Props = {
	serverData: {
		message: string
		status: string
	}
}

const SSRPage: React.FC<Props> = ({ serverData }: Props) => (
	<Layout>
		<SEO title="SSR Page" />
		<h1>Server Side Rendered content</h1>

		<img className="w-full" alt="dog pic" src={serverData.message} />
	</Layout>
)

export default SSRPage

export async function getServerData() {
	try {
		const result = await fetch(`https://dog.ceo/api/breed/chow/images/random`)

		if (!result.ok) throw new Error('Response failed')

		return {
			props: await result.json(),
		}
	} catch (error) {
		return {
			headers: {
				status: 500,
			},
			props: {
				message: error,
			},
		}
	}
}
