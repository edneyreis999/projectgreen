import React from 'react'
import { IPlayerData } from '../models/auth'

const AuthenticationContext = React.createContext<{
    isAuthenticated(): Promise<boolean>
    login(playerData: IPlayerData): Promise<void>
    register(playerData: IPlayerData): Promise<void>
}>({
    isAuthenticated: async () => false,
    login: async () => null,
    register: async () => null
})

export default AuthenticationContext