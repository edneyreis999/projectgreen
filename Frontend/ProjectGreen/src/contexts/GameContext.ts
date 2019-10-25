import React from 'react'
import { IPlayerData } from '../models/auth'

const GameContext = React.createContext<{
    serverSelected(playerData: string): Promise<void>
}>({
    serverSelected: async () => null,
})

export default GameContext