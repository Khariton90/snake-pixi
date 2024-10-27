import {
	BOARD_MATRIX,
	INITIAL_SNAKE,
	InverseDirection,
	START_LENGTH_SNAKE,
	TIMER,
} from '@/shared/consts'
import { Dialog } from '@/entities/dialog'
import { RowBoard } from '@/entities/row-board'
import { setRandomPosition, gameLoop, eatFood } from '@/shared/lib/game-loop'
import { Direction, Snake, Status } from '@/shared/types'
import { useState, useCallback, useEffect } from 'react'
import { BoardHeader } from '@/entities/board-header'
import styles from './board.module.css'

type BoardProps = {
	status: Status
	onChangeStatus: (status: Status) => void
}

export function Board({ status, onChangeStatus }: BoardProps) {
	const [snake, setSnake] = useState(INITIAL_SNAKE)
	const [direction, setDirection] = useState(Direction.Bottom)
	const [eat, setEat] = useState(setRandomPosition(snake))
	const [isKeyDown, setIsKeyDown] = useState(false)

	const changeDirection = useCallback(
		(evt: KeyboardEvent) => {
			const code = Object.values(Direction).find(
				element => element === evt.code
			)

			if (!code) {
				return null
			}

			if (InverseDirection[code] !== direction && !isKeyDown) {
				setDirection(() => code)
				setIsKeyDown(() => true)
			}
		},
		[direction, isKeyDown]
	)

	const setGameOver = useCallback(
		(snake: Snake) => {
			if (snake.length <= START_LENGTH_SNAKE) {
				return
			}

			const lastIndex = snake.length - 1
			const [headX, headY] = snake[lastIndex]
			const collision = snake
				.slice(0, lastIndex)
				.some(([x, y]) => headX === x && headY === y)

			if (collision) {
				return onChangeStatus(Status.Stop)
			}
		},
		[onChangeStatus]
	)

	const setGameAgain = () => {
		setSnake(() => INITIAL_SNAKE)
		setDirection(() => Direction.Bottom)
		onChangeStatus(Status.Playing)
	}

	useEffect(() => {
		document.addEventListener('keydown', changeDirection)
		return () => document.removeEventListener('keydown', changeDirection)
	}, [changeDirection, direction])

	useEffect(() => {
		const [newSnake] = gameLoop(snake, eat, direction)
		setGameOver(newSnake)

		if (eatFood(snake, eat)) {
			setEat(setRandomPosition(snake))
		}

		if (status === Status.Playing) {
			const timer = setTimeout(() => {
				setIsKeyDown(() => false)
				setSnake(() => newSnake)
			}, TIMER)

			return () => clearInterval(timer)
		}
	}, [direction, eat, setGameOver, snake, status])

	const score = snake.length - START_LENGTH_SNAKE

	return (
		<main className='main'>
			<Dialog status={status} setGameAgain={setGameAgain} score={score} />
			<BoardHeader score={score} />
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
