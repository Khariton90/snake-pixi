import { Board } from '@/entities/board'
import { StatusButton } from '@/entities/status-button'
import { Footer } from '@/shared/ui'
import { AppContext } from '@/shared/hooks'
import { Status } from '@/shared/types'
import { useState } from 'react'
import { useLocalStorage } from '@/shared/hooks'
import './styles/index.css'

function App(): JSX.Element {
	const [gameStatus, setGameStatus] = useState(Status.Paused)
	const { totalScore, handleChangeTotalScore } = useLocalStorage()

	const changeStatus = (status: Status) => {
		setGameStatus(() => status)
	}

	return (
		<AppContext.Provider value={{ totalScore, gameStatus, changeStatus }}>
			<div className='wrapper'>
				<Board handleChangeTotalScore={handleChangeTotalScore} />
				<StatusButton />
				<Footer />
			</div>
		</AppContext.Provider>
	)
}

export default App
