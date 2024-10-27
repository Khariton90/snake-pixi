import { Board } from '@/entities/board'
import { useState } from 'react'
import { Status } from '@/shared/types'
import { StatusButton } from '@/entities/status-button'
import { Footer } from '@/shared/ui'
import './styles/index.css'

function App(): JSX.Element {
	const [gameStatus, setGameStatus] = useState(Status.Paused)
	const onChangeStatus = (status: Status) => {
		setGameStatus(() => status)
	}

	return (
		<div className='wrapper'>
			<Board status={gameStatus} onChangeStatus={onChangeStatus} />
			<StatusButton status={gameStatus} onChangeStatus={onChangeStatus} />
			<Footer />
		</div>
	)
}

export default App
