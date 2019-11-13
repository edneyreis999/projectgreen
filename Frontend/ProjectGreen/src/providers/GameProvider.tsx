import React, { useState } from 'react'
import { AsyncStorage } from 'react-native'
import GameContext from '../contexts/GameContext'
import { NavigationService } from '../services/NavigationService'
import { IPlayerData } from '../models/auth'
import { ICity } from '../models/game'
import { useEmit, useEvent } from 'socketio-hooks'

const GameProvider: React.FunctionComponent<{

}> = ({ children }) => {
    const [city, setCity] = useState<ICity>(null)

    const sendSelectedServer = useEmit('send.selectCity', 'game')
    
    useEvent('send.city.selected', 'game', () => {
        NavigationService.navigate("Main")
    })



    const initGame = async (city: ICity): Promise<void> => {
        console.log('---- faz os corre tudo pra iniciar o game ----')
        console.log('---- conecta no socket e os caraio ----')
        console.log('---- Jogar o serverSelected aqui dentro ----')
        await AsyncStorage.setItem('serverSelected', JSON.stringify(city))
        sendSelectedServer(city._id)

        // se deu tudo certo vai para tela de game!
    }

    return (
        <GameContext.Provider value={{
            initGame
        }}>
            {children}
        </GameContext.Provider>
    )
}

export default GameProvider