import { StatusTitle } from '@/shared/consts'
import { Status } from '@/shared/types'

type ButtonProps = {
	status: Status
	onChangeStatus: (status: Status) => void
}

export function StatusButton({
	status,
	onChangeStatus,
}: ButtonProps): JSX.Element {
	const statusList = {
		[Status.Paused]: Status.Playing,
		[Status.Playing]: Status.Paused,
		[Status.Stop]: Status.Playing,
	}

	return (
		<button
			className='button'
			onClick={() => onChangeStatus(statusList[status])}
		>
			{StatusTitle[statusList[status]]}
		</button>
	)
}
