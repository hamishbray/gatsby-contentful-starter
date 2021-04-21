import React from 'react'
import { useIdentityContext } from 'react-netlify-identity'

import ClientOnly from '../../components/clientOnly'

const Profile: React.FC = () => {
	const { user } = useIdentityContext()

	return (
		<ClientOnly>
			<h1>Hi {user?.user_metadata?.full_name}!</h1>
		</ClientOnly>
	)
}

export default Profile
