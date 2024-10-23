import { Board } from '@/entities/board/ui/board'
import './styles/index.css'
import { useState } from 'react'
import { Status } from '@/shared/types'
import { StatusButton } from '@/entities/status-button'
import { Footer } from '@/shared/ui'

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
