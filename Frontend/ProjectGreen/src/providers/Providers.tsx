import React, { Children, FunctionComponent } from 'react'
import AuthenticationProvider from './AuthenticationProvider'
import GameProvider from './GameProvider'

const Providers: FunctionComponent = ({ children }) => {
    return (
        <AuthenticationProvider>
            <GameProvider>
                {children}
            </GameProvider>
        </AuthenticationProvider>
    )
}

export default Providers