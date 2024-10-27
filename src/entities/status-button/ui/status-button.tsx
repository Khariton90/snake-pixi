import { StatusTitle } from '@/shared/consts'
import { AppContext } from '@/shared/hooks'
import { Status } from '@/shared/types'
import { useContext } from 'react'

export function StatusButton(): JSX.Element {
	const statusList = {
		[Status.Paused]: Status.Playing,
		[Status.Playing]: Status.Paused,
		[Status.Stop]: Status.Playing,
	}

	const { gameStatus, changeStatus } = useContext(AppContext)

	return (
		<button
			className='button'
			onClick={() => changeStatus(statusList[gameStatus])}
		>
			{StatusTitle[statusList[gameStatus]]}
		</button>
	)
}
