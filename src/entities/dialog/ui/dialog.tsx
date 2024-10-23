import { Status } from '@/shared/types'
import { memo, useEffect, useRef } from 'react'

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

	return (
		<dialog className='dialog' ref={dialogRef} open={false}>
			<h3 className='dialog-title'>Игра закончена</h3>
			<p className='dialog-score'>Ваш результат: {score}</p>
			<button className='button' onClick={setGameAgain}>
				Начать снова
			</button>
		</dialog>
	)
}

export const Dialog = memo(DialogComponent)
