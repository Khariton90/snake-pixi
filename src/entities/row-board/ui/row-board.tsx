import { memo } from 'react'
import { CellEnum } from '@/shared/types'
import { CellBoard } from '@/entities/cell-board'

function checkCell(eat: number[], snake: number[][], row: number, col: number) {
	let type = eat[0] === row && eat[1] === col && CellEnum.Eat

	if (type) {
		return CellEnum.Eat
	}

	type = snake.some(el => el[0] === row && el[1] === col) && CellEnum.Snake

	if (type) {
		return CellEnum.Snake
	}

	return CellEnum.Empty
}

type RowCellProps = {
	row: number[]
	index: number
	snake: number[][]
	eat: number[]
}

const RowCellComponent = ({
	row,
	index,
	snake,
	eat,
}: RowCellProps): JSX.Element => {
	return (
		<div className='row'>
			{row.map((_, colIdx) => {
				return (
					<CellBoard type={checkCell(eat, snake, index, colIdx)} key={colIdx} />
				)
			})}
		</div>
	)
}

export const RowBoard = memo(RowCellComponent)
