import { memo } from 'react'
import styles from './board-header.module.css'

type BoardHeaderProps = {
	score: number
}

export function BoardHeaderComponent({ score }: BoardHeaderProps): JSX.Element {
	return (
		<div className={styles.boardHeader}>
			<span className={styles.score}>
				<b>Очки: {score} </b>
			</span>
		</div>
	)
}

export const BoardHeader = memo(BoardHeaderComponent)
