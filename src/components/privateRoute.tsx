import React, { useEffect, useState } from 'react'
import { navigate } from 'gatsby'
import { useIdentityContext } from 'react-netlify-identity-widget'

type Props = {
	component: React.FC<any>
	location: Location
}

const PrivateRoute: React.FC<any> = ({
	component: Component,
	location,
	...rest
}: Props): JSX.Element | null => {
	const [hasMounted, setHasMounted] = useState(false)
	const { isLoggedIn } = useIdentityContext()

	useEffect(() => setHasMounted(true), [])

	if (!hasMounted) return null

	if (!isLoggedIn && location.pathname !== `/account/login`) {
		navigate('/account/login')
		return null
	}

	return <Component {...rest} />
}

export default PrivateRoute
