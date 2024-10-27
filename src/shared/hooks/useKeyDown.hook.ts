import { useCallback, useEffect, useState } from 'react'
import { Direction } from '../types'
import { InverseDirection } from '../consts'

export function useKeyDown() {
	const [direction, setDirection] = useState(Direction.Bottom)

	const changeDirection = useCallback(
		(evt: KeyboardEvent) => {
			const code = Object.values(Direction).find(
				element => element === evt.code
			)

			if (!code || InverseDirection[code] === direction) {
				return false
			}

			setDirection(() => code)
		},
		[direction]
	)

	useEffect(() => {
		document.addEventListener('keydown', changeDirection)
		return () => document.removeEventListener('keydown', changeDirection)
	}, [changeDirection, direction])

	return direction
}
