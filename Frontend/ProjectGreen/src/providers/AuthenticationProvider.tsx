import React, { useState } from 'react'
import { AsyncStorage } from 'react-native'
import AuthenticationContext from '../contexts/AuthenticationContext'
import { NavigationService } from '../services/NavigationService'
import { IPlayerData, IUserData } from '../models/auth'

const AuthenticationProvider: React.FunctionComponent<{

}> = ({ children }) => {
    const [token, setToken] = useState<string>(null)
    const [user, setUser] = useState<IUserData>(null)

    const isAuthenticated = async (): Promise<boolean> => {
        const authenticated = JSON.parse((await AsyncStorage.getItem('isAuthenticated')))
        if(authenticated){
            const token = await AsyncStorage.getItem('token');
            // aqui ele vai conectar no socket!
            // porque vai triggerar o if(token) no socketProvider
            setToken(token)
        }

        return !!authenticated
    }

    const login = async (playerData: IPlayerData): Promise<void> => {
        await AsyncStorage.setItem('isAuthenticated', JSON.stringify(true))
        await AsyncStorage.setItem('token', playerData.tokenSocket)
        await AsyncStorage.setItem('user', JSON.stringify(playerData.user))

        setToken(playerData.tokenSocket);
        setUser(playerData.user);
        NavigationService.navigate("SelectServer")
    }

    const register = async (playerData: IPlayerData): Promise<void> => {
        await AsyncStorage.setItem('isAuthenticated', JSON.stringify(true))
        await AsyncStorage.setItem('token', playerData.tokenSocket)
        await AsyncStorage.setItem('user', JSON.stringify(playerData.user))

        setToken(playerData.tokenSocket);
        setUser(playerData.user);
        NavigationService.navigate("SelectServer")
    }

    return (
        <AuthenticationContext.Provider value={{
            isAuthenticated,
            login,
            register,
            token,
            user
        }}>
            {children}
        </AuthenticationContext.Provider>
    )
}

export default AuthenticationProvider