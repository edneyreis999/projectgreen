import React from 'react'
import { AsyncStorage } from 'react-native'
import AuthenticationContext from '../contexts/AuthenticationContext'
import { NavigationService } from '../services/NavigationService'
import { IPlayerData } from '../models/auth'

const AuthenticationProvider: React.FunctionComponent<{

}> = ({ children }) => {
    const isAuthenticated = async (): Promise<boolean> => {
        const authenticated = JSON.parse((await AsyncStorage.getItem('isAuthenticated')))

        return !!authenticated
    }

    const login = async (playerData: IPlayerData): Promise<void> => {
        await AsyncStorage.setItem('isAuthenticated', JSON.stringify(true))
        await AsyncStorage.setItem('token', playerData.tokenSocket)
        await AsyncStorage.setItem('user', JSON.stringify(playerData.user))
        console.log('chamou NavigationService do login')
        NavigationService.navigate("Main")
    }

    const register = async (playerData: IPlayerData): Promise<void> => {
        await AsyncStorage.setItem('isAuthenticated', JSON.stringify(true))
        await AsyncStorage.setItem('token', playerData.tokenSocket)
        await AsyncStorage.setItem('user', JSON.stringify(playerData.user))
        console.log('chamou NavigationService do register')
        NavigationService.navigate("Main")
    }

    return (
        <AuthenticationContext.Provider value={{
            isAuthenticated,
            login,
            register
        }}>
            {children}
        </AuthenticationContext.Provider>
    )
}

export default AuthenticationProvider