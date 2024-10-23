const SNAKE_SCORE = 'bestScore'

export const setBestScore = (result: number) => {
	localStorage.setItem(SNAKE_SCORE, result.toString())
}

export const getBestScore = (): number => {
	const result = localStorage.getItem(SNAKE_SCORE)
	const value = result ? Number(result) : 0
	return value
}
