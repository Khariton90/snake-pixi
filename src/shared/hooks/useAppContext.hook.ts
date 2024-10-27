/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext } from 'react'
import { Status } from '../types'

export type AppContext = {
	totalScore: number
	gameStatus: Status
	changeStatus: (status: Status) => void
}

export const AppContext = createContext<AppContext>({
	totalScore: 0,
	gameStatus: Status.Stop,
	changeStatus: (_status: Status) => {},
})
