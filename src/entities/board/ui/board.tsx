import { Dialog } from '@/entities/dialog'
import { RowBoard } from '@/entities/row-board'
import {
	BOARD_MATRIX,
	INITIAL_SNAKE,
	InverseDirection,
	START_LENGTH_SNAKE,
	TIMER,
} from '@/shared/consts'
import { setRandomPosition, gameLoop } from '@/shared/lib/game-loop'
import { Direction, Status } from '@/shared/types'
import { useState, useCallback, useEffect } from 'react'
import styles from './board.module.css'

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

			if (InverseDirection[code] === direction) {
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
		const [headX, headY] = snake[lastIndex]
		const collision = snake
			.slice(0, lastIndex)
			.some(([x, y]) => headX === x && headY === y)

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
		setEat(setRandomPosition(snake))
	}, [])

	useEffect(() => {
		document.addEventListener('keydown', changeDirection)
		return () => document.removeEventListener('keydown', changeDirection)
	}, [changeDirection, direction])

	useEffect(() => {
		const [newSnake] = gameLoop(snake, eat, direction)
		setGameOver(newSnake)

		if (eatFood()) {
			setEat(setRandomPosition(snake))
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
		<main className='main'>
			<Dialog status={status} setGameAgain={setGameAgain} score={score} />
			<div className={styles.boardHeader}>
				<span className={styles.score}>
					<b>Очки: {score} </b>
				</span>
			</div>
			<div className={styles.board}>
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
		</main>
	)
}
