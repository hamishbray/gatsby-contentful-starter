import React from 'react'

type Props = {
	text: string
}

const Headline: React.FC<Props> = ({ text }: Props) => <h1>{text}</h1>

export default Headline
