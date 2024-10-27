import {
	BOARD_MATRIX,
	INITIAL_SNAKE,
	START_LENGTH_SNAKE,
	TIMER,
} from '@/shared/consts'
import { Dialog } from '@/entities/dialog'
import { RowBoard } from '@/entities/row-board'
import {
	setRandomPosition,
	gameLoop,
	eatFood,
	getCollisionWithTail,
} from '@/shared/lib/game-loop'
import { Status } from '@/shared/types'
import { useState, useEffect, useContext } from 'react'
import { BoardHeader } from '@/entities/board-header'
import { AppContext, useKeyDown } from '@/shared/hooks'
import styles from './board.module.css'

type BoardProps = {
	handleChangeTotalScore: (score: number) => void
}

export function Board({ handleChangeTotalScore }: BoardProps) {
	const { gameStatus, changeStatus } = useContext(AppContext)
	const [snake, setSnake] = useState(INITIAL_SNAKE)
	const [eatPosition, setEatPosition] = useState(setRandomPosition(snake))
	const direction = useKeyDown()

	const setGameAgain = () => {
		setSnake(() => INITIAL_SNAKE)
		changeStatus(Status.Playing)
	}

	useEffect(() => {
		const [newSnake] = gameLoop(snake, eatPosition, direction)

		if (getCollisionWithTail(snake)) {
			handleChangeTotalScore(score)
			return changeStatus(Status.Stop)
		}

		if (eatFood(snake, eatPosition)) {
			setEatPosition(setRandomPosition(snake))
		}

		if (gameStatus === Status.Playing) {
			const timer = setTimeout(() => {
				setSnake(() => newSnake)
			}, TIMER)

			return () => clearInterval(timer)
		}
	}, [direction, eatPosition, snake, gameStatus, changeStatus])

	const score = snake.length - START_LENGTH_SNAKE

	return (
		<main className='main'>
			<Dialog status={gameStatus} setGameAgain={setGameAgain} score={score} />
			<BoardHeader score={score} />
			<div className={styles.board}>
				{BOARD_MATRIX.map((row, rowIdx) => (
					<RowBoard
						eatPosition={eatPosition}
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
