import { BOARD_SIZE } from '../consts/board.const'
import { START_LENGTH_SNAKE } from '../consts/snake.const'
import { Direction, Snake } from '../types'

export function backSnakeToBoard(obj: { x: number; y: number }) {
	const newObj = { ...obj }
	const board = BOARD_SIZE - 1

	switch (true) {
		case newObj.x > board:
			newObj.x = 0
			break

		case newObj.x < 0:
			newObj.x = board
			break

		case newObj.y > board:
			newObj.y = 0
			break

		case newObj.y < 0:
			newObj.y = board
			break
	}

	return newObj
}

export function setMovement(
	movement: Direction,
	obj: { x: number; y: number }
) {
	const newObj = { ...obj }

	switch (true) {
		case movement === Direction.Left:
			newObj.y -= 1
			break
		case movement === Direction.Right:
			newObj.y += 1
			break
		case movement === Direction.Top:
			newObj.x -= 1
			break
		case movement === Direction.Bottom:
			newObj.x += 1
			break
	}

	return newObj
}

export function gameLoop(
	snake: Snake,
	eat: number[],
	movement: Direction
): [Snake, number[]] {
	const head = snake[snake.length - 1]
	const newSnake = snake.slice()

	const obj = {
		x: head[0],
		y: head[1],
	}

	const { x, y } = setMovement(movement, obj)
	obj.x = x
	obj.y = y

	const newObj = backSnakeToBoard(obj)
	newSnake.push([newObj.x, newObj.y])

	if (eat[0] !== x || eat[1] !== y) {
		newSnake.shift()
	}

	return [newSnake, eat]
}

export function setRandomPosition(snake: Snake) {
	const randomPos = [
		Math.floor(Math.random() * BOARD_SIZE),
		Math.floor(Math.random() * BOARD_SIZE),
	]

	const collision = snake.find(
		([x, y]) => x === randomPos[0] && y === randomPos[1]
	)

	if (collision) {
		return setRandomPosition(snake)
	}

	return randomPos
}

export function eatFood(snake: Snake, eat: number[]) {
	const [x, y] = snake[snake.length - 1]
	return eat[0] === x && eat[1] === y
}

export function getCollisionWithTail(snake: Snake): boolean {
	if (snake.length <= START_LENGTH_SNAKE) {
		return false
	}

	const lastIndex = snake.length - 1
	const [headX, headY] = snake[lastIndex]
	return snake.slice(0, lastIndex).some(([x, y]) => headX === x && headY === y)
}
