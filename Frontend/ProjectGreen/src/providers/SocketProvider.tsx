import React, { useContext } from 'react'
import AuthenticationContext from '../contexts/AuthenticationContext'
import { SocketIOProvider } from 'socketio-hooks'
import { EBaseURL } from '../services/http/endpoints'

const SocketProvider: React.FunctionComponent<{

}> = ({ children }) => {
    const { token } = useContext(AuthenticationContext);

    return (
        <SocketIOProvider url={EBaseURL.Development} namespaces={['game']} connectionOptions={{ query: { token } }}>
            {children}
        </SocketIOProvider>
    )
}

export default SocketProvider