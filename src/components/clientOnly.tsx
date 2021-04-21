import React, { useEffect, useState } from 'react'

type Props = {
	children: React.FC<any>
}

const clientOnly: React.FC<any> = ({
	children,
	...rest
}: Props): JSX.Element | null => {
	const [hasMounted, setHasMounted] = useState(false)
	useEffect(() => setHasMounted(true), [])
	if (!hasMounted) return null

	return <div {...rest}>{children}</div>
}

export default clientOnly
