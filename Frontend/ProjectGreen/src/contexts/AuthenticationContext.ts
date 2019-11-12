import React from 'react'
import { IPlayerData, IUserData } from '../models/auth'

const AuthenticationContext = React.createContext<{
    isAuthenticated(): Promise<boolean>
    login(playerData: IPlayerData): Promise<void>
    register(playerData: IPlayerData): Promise<void>
    token: string
    user: IUserData
}>({
    isAuthenticated: async () => false,
    login: async () => null,
    register: async () => null,
    token: null,
    user: null
})

export default AuthenticationContext