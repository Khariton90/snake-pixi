import { RowBoard } from '@/entities/row-board'
import { BOARD_CENTER, BOARD_MATRIX, TIMER } from '@/shared/consts'
import { setEatRandomPosition, gameLoop } from '@/shared/lib/game-loop'
import { Direction, Status } from '@/shared/types'
import { useState, useCallback, useEffect } from 'react'

const inverseDirection = {
	[Direction.Bottom]: Direction.Top,
	[Direction.Top]: Direction.Bottom,
	[Direction.Left]: Direction.Right,
	[Direction.Right]: Direction.Left,
}

type BoardProps = {
	status: Status
}

export function Board({ status }: BoardProps) {
	const [snake, setSnake] = useState([[BOARD_CENTER, BOARD_CENTER]])
	const [direction, setDirection] = useState(Direction.Bottom)
	const [eat, setEat] = useState([0, 0])

	const eatFood = useCallback(() => {
		const [x, y] = snake[snake.length - 1]
		return eat[0] === x && eat[1] === y
	}, [eat, snake])

	const changeDirection = useCallback(
		(evt: KeyboardEvent) => {
			const code = evt.code as Direction

			if (inverseDirection[code] === direction) {
				return
			}
			setDirection(() => code)
		},
		[direction]
	)

	useEffect(() => {
		document.addEventListener('keydown', changeDirection)

		return () => document.removeEventListener('keydown', changeDirection)
	}, [changeDirection, direction])

	useEffect(() => {
		setEat(setEatRandomPosition())
	}, [])

	useEffect(() => {
		const [newSnake] = gameLoop(snake, eat, direction)

		if (eatFood()) {
			setEat(setEatRandomPosition())
		}

		if (status === Status.Playing) {
			const timer = setTimeout(() => {
				setSnake(newSnake)
			}, TIMER)

			return () => clearInterval(timer)
		}
	}, [snake, status])

	return (
		<>
			<h2 className='score'>Score: {snake.length}</h2>
			<div className='board'>
				{BOARD_MATRIX.map((row, rowIdx) => (
					<RowBoard
						eat={eat}
						key={rowIdx}
						row={row}
						index={rowIdx}
						snake={snake}
					/>
				))}
			</div>
		</>
	)
}
