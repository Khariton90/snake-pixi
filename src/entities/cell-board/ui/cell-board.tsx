import { memo } from 'react'
import { CellEnum } from '@/shared/types'

type CellProps = {
	type: CellEnum
}

const CellComponent = ({ type }: CellProps): JSX.Element => {
	return <div className={`col ${type}`}></div>
}

export const CellBoard = memo(CellComponent)
