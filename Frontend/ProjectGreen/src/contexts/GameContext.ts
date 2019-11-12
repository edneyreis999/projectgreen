import React from 'react'
import { ICity } from '../models/game'

const GameContext = React.createContext<{
    initGame(city: ICity): Promise<void>
}>({
    initGame: async () => null,
})

export default GameContext