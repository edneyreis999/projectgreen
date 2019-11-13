import React, { Children, FunctionComponent } from 'react'
import AuthenticationProvider from './AuthenticationProvider'
import GameProvider from './GameProvider'
import SocketProvider from './SocketProvider'


const Providers: FunctionComponent = ({ children }) => {
    return (
        <AuthenticationProvider>
            <SocketProvider>
                <GameProvider>
                    {children}
                </GameProvider>
            </SocketProvider>
        </AuthenticationProvider>
    )
}

export default Providers