import { memo } from 'react'
import { CellEnum } from '@/shared/types'
import apple from '@/shared/assets/apple.svg'

type CellProps = {
	type: CellEnum
}

const CellComponent = ({ type }: CellProps): JSX.Element => {
	return (
		<div className={`col ${type}`}>
			{type === CellEnum.Eat ? <img className='apple' src={apple} /> : null}
		</div>
	)
}

export const CellBoard = memo(CellComponent)
