import { Status } from '@/shared/types'
import { memo, useEffect, useRef } from 'react'
import styles from './dialog.module.css'

type DialogProps = {
	status: Status
	setGameAgain: () => void
	score: number
}

function DialogComponent({
	status,
	setGameAgain,
	score,
}: DialogProps): JSX.Element {
	const dialogRef = useRef<HTMLDialogElement | null>(null)

	useEffect(() => {
		if (status === Status.Stop) {
			dialogRef.current!.showModal()
		}
	}, [status])

	if (status === Status.Stop) {
		return (
			<dialog className={styles.dialog} ref={dialogRef} open={false}>
				<h3 className={styles.dialogTitle}>Игра закончена</h3>
				<p className={styles.dialogScore}>Ваш результат: {score}</p>
				<button className='button' onClick={setGameAgain}>
					Начать снова
				</button>
			</dialog>
		)
	}

	return <></>
}

export const Dialog = memo(DialogComponent)
