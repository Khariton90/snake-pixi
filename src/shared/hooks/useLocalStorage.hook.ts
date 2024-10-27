import { useState } from 'react'
import { getBestScore, setBestScore } from '../lib'

export function useLocalStorage() {
	const [totalScore, setTotalScore] = useState(getBestScore())

	const handleChangeTotalScore = (score: number) => {
		setBestScore(score)
		setTotalScore(() => score)
	}

	return { totalScore, handleChangeTotalScore }
}
