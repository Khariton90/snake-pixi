export const BOARD_SIZE = 21
export const BOARD_CENTER = Math.floor(BOARD_SIZE / 2)
export const BOARD_MATRIX = Array.from(Array(BOARD_SIZE), () =>
	Array(BOARD_SIZE).fill(0)
)
