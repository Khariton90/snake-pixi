import { Board } from '@/entities/board/ui/board'
import './styles/index.css'
import { useState } from 'react'
import { Status } from '@/shared/types'
import { StatusButton } from '@/entities/status-button'

function App(): JSX.Element {
	const [gameStatus, setGameStatus] = useState(Status.Stop)

	const onChangeStatus = (status: Status) => {
		setGameStatus(() => status)
	}

	return (
		<div className='wrapper'>
			<main className='main'>
				<Board status={gameStatus} />
			</main>
			<StatusButton status={gameStatus} onChangeStatus={onChangeStatus} />
			<footer className='footer'>Разработал Khariton90</footer>
		</div>
	)
}

export default App
