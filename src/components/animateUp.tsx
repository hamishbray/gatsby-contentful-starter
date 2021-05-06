import React, { useEffect } from 'react'
import sal from 'sal.js'

type Props = {
	children: React.FC<any>
	delay: number
}

const AnimateUp: React.FC<any> = ({
	children,
	delay = 200,
}: Props): JSX.Element => {
	useEffect(() => {
		sal()
	}, [])

	return (
		<div
			data-sal="slide-up"
			data-sal-delay={delay}
			data-sal-easing="ease-out-cubic"
			data-sal-duration="700"
		>
			{children}
		</div>
	)
}

export default AnimateUp
