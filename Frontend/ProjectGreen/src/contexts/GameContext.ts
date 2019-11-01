import React from 'react'
import { ICity } from '../models/game'

const GameContext = React.createContext<{
    serverSelected(city: ICity): Promise<void>
    initGame(): Promise<void>
}>({
    serverSelected: async () => null,
    initGame: async () => null,
})

export default GameContext