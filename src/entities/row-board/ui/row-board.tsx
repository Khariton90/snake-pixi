import { memo } from 'react'
import { CellEnum, Snake } from '@/shared/types'
import { CellBoard } from '@/entities/cell-board'
import './row-board.css'

function checkCell(
	eatPosition: number[],
	snake: Snake,
	row: number,
	col: number
) {
	let type = eatPosition[0] === row && eatPosition[1] === col && CellEnum.Eat

	if (type) {
		return CellEnum.Eat
	}

	type =
		snake.some(element => element[0] === row && element[1] === col) &&
		CellEnum.Snake

	if (type) {
		return CellEnum.Snake
	}

	return CellEnum.Empty
}

type RowCellProps = {
	row: number[]
	index: number
	snake: Snake
	eatPosition: number[]
}

const RowCellComponent = ({
	row,
	index,
	snake,
	eatPosition,
}: RowCellProps): JSX.Element => {
	return (
		<div className='row'>
			{row.map((_, colIdx) => {
				return (
					<CellBoard
						type={checkCell(eatPosition, snake, index, colIdx)}
						key={colIdx}
					/>
				)
			})}
		</div>
	)
}

export const RowBoard = memo(RowCellComponent)
