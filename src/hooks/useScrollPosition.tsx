import React, { useEffect, useLayoutEffect, useRef } from 'react'

import { isClient } from '../utils/common'

type Position = {
	x: number
	y: number
}

type ScrollProps = {
	prevPosition: Position
	currentPosition: Position
}

type ScrollEffect = (props: ScrollProps) => void

const zeroPosition: Position = { x: 0, y: 0 }

const getScrollPosition = (): Position =>
	isClient ? { x: window.scrollX, y: window.scrollY } : zeroPosition

export const useScrollPosition = ({
	scrollEffect,
}: {
	scrollEffect: ScrollEffect
}): void => {
	const position = useRef(getScrollPosition())
	const timeout = useRef<NodeJS.Timeout>()

	const callback = () => {
		const currentPosition = getScrollPosition()
		scrollEffect({ prevPosition: position.current, currentPosition })
		position.current = currentPosition
		timeout.current && clearTimeout(timeout.current)
	}

	useEffect(() => {
		if (!isClient) return undefined

		const handleScroll = () => (timeout.current = setTimeout(callback))

		window.addEventListener('scroll', handleScroll)

		return () => window.removeEventListener('scroll', handleScroll)
	})
}
