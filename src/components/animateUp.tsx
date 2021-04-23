import React from 'react'

type Props = {
	children: React.FC<any>
	delay: number
}

const AnimateUp: React.FC<any> = ({
	children,
	delay = 200,
}: Props): JSX.Element => (
	<div
		data-sal="slide-up"
		data-sal-delay={delay}
		data-sal-easing="ease-out-cubic"
		data-sal-duration="700"
	>
		{children}
	</div>
)

export default AnimateUp
