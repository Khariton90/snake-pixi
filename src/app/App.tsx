import { Board } from '@/entities/board/ui/board'
import './styles/index.css'

function App(): JSX.Element {
	return (
		<div className='wrapper'>
			<main className='main'>
				<Board />
			</main>
			<footer className='footer'>Разработал Khariton90</footer>
		</div>
	)
}

export default App
