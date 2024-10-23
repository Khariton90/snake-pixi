import { Dialog } from '@/entities/dialog'
import { RowBoard } from '@/entities/row-board'
import {
	BOARD_MATRIX,
	INITIAL_SNAKE,
	START_LENGTH_SNAKE,
	TIMER,
} from '@/shared/consts'
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
	onChangeStatus: (status: Status) => void
}

export function Board({ status, onChangeStatus }: BoardProps) {
	const [snake, setSnake] = useState(INITIAL_SNAKE)
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

	const setGameOver = (snake: number[][]) => {
		if (snake.length <= START_LENGTH_SNAKE) {
			return
		}
		const lastIndex = snake.length - 1
		const snakeHead = snake[lastIndex]

		const collision = snake
			.slice(0, lastIndex)
			.some(([x, y]) => snakeHead[0] === x && snakeHead[1] === y)

		if (collision) {
			onChangeStatus(Status.Stop)
		}
	}

	const setGameAgain = () => {
		setSnake(() => INITIAL_SNAKE)
		setDirection(() => Direction.Bottom)
		onChangeStatus(Status.Playing)
	}

	useEffect(() => {
		setEat(setEatRandomPosition())
	}, [])

	useEffect(() => {
		document.addEventListener('keydown', changeDirection)
		return () => document.removeEventListener('keydown', changeDirection)
	}, [changeDirection, direction])

	useEffect(() => {
		const [newSnake] = gameLoop(snake, eat, direction)
		setGameOver(newSnake)
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

	const score = snake.length - START_LENGTH_SNAKE

	return (
		<>
			{status === Status.Stop ? (
				<Dialog status={status} setGameAgain={setGameAgain} score={score} />
			) : null}
			<h2 className='score'>Score: {score}</h2>
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
