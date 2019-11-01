import React from 'react'
import { AsyncStorage } from 'react-native'
import GameContext from '../contexts/GameContext'
import { NavigationService } from '../services/NavigationService'
import { IPlayerData } from '../models/auth'
import { ICity } from '../models/game'

const GameProvider: React.FunctionComponent<{

}> = ({ children }) => {
    
    const serverSelected = async (city: ICity): Promise<void> => {
        await AsyncStorage.setItem('serverSelected', JSON.stringify(city))
    }
    const initGame = async (): Promise<void> => {
        console.log('---- faz os corre tudo pra iniciar o game ----')
        console.log('---- conecta no socket e os caraio ----')

        NavigationService.navigate("Main")
    }

    return (
        <GameContext.Provider value={{
            serverSelected,
            initGame
        }}>
            {children}
        </GameContext.Provider>
    )
}

export default GameProvider