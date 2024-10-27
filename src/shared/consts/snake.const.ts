import { Direction, Snake } from '../types'
import { BOARD_CENTER } from './board.const'

export const START_LENGTH_SNAKE = 3

export const INITIAL_SNAKE: Snake = Array.from(
	Array(START_LENGTH_SNAKE),
	(_, index) => [BOARD_CENTER + index, BOARD_CENTER]
)

export const InverseDirection = {
	[Direction.Bottom]: Direction.Top,
	[Direction.Top]: Direction.Bottom,
	[Direction.Left]: Direction.Right,
	[Direction.Right]: Direction.Left,
}
