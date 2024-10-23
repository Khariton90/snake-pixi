import { Board } from '@/entities/board/ui/board'
import './styles/index.css'
import { useState } from 'react'
import { Status } from '@/shared/types'
import { StatusButton } from '@/entities/status-button'

function App(): JSX.Element {
	const [gameStatus, setGameStatus] = useState(Status.Paused)

	const onChangeStatus = (status: Status) => {
		setGameStatus(() => status)
	}

	return (
		<div className='wrapper'>
			<main className='main'>
				<Board status={gameStatus} onChangeStatus={onChangeStatus} />
			</main>
			<StatusButton status={gameStatus} onChangeStatus={onChangeStatus} />
			<footer className='footer'>
				<a
					className='link'
					href='https://github.com/Khariton90'
					target='_blank'
				>
					Разработал Khariton90
				</a>
			</footer>
		</div>
	)
}

export default App
