import React from 'react'
import { AsyncStorage } from 'react-native'
import GameContext from '../contexts/GameContext'
import { NavigationService } from '../services/NavigationService'
import { IPlayerData } from '../models/auth'

const GameProvider: React.FunctionComponent<{

}> = ({ children }) => {
    
    const serverSelected = async (serverSelected: string): Promise<void> => {
        console.log('---- serverSelected ----')
        console.log(serverSelected)
        await AsyncStorage.setItem('serverSelected', serverSelected)
        NavigationService.navigate("Main")
    }

    return (
        <GameContext.Provider value={{
            serverSelected
        }}>
            {children}
        </GameContext.Provider>
    )
}

export default GameProvider