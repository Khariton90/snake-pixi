import { memo, useContext } from 'react'
import styles from './board-header.module.css'
import { AppContext } from '@/shared/hooks'

type BoardHeaderProps = {
	score: number
}

export function BoardHeaderComponent({ score }: BoardHeaderProps): JSX.Element {
	const { totalScore } = useContext(AppContext)

	return (
		<div className={styles.boardHeader}>
			<span className={styles.score}>
				<b>Очки: {score} </b>
			</span>
			<span className={styles.score}>
				<b>Рекорд: {totalScore}</b>
			</span>
		</div>
	)
}

export const BoardHeader = memo(BoardHeaderComponent)
