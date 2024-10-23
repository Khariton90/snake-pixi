import { BOARD_CENTER } from './board.const'

export const START_LENGTH_SNAKE = 3

export const INITIAL_SNAKE = Array.from(
	Array(START_LENGTH_SNAKE),
	(_, index) => [BOARD_CENTER + index, BOARD_CENTER]
)
