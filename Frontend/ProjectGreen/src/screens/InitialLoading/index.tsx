import React, { useContext, useEffect } from 'react'
import AuthenticationContext from '../../contexts/AuthenticationContext'
import { useNavigation } from 'react-navigation-hooks'
import { AppLoading } from 'expo'

const AuthenticationLoading: React.FunctionComponent<{

}> = ({ }) => {
    const { isAuthenticated } = useContext(AuthenticationContext)

    const { navigate } = useNavigation()

    useEffect(() => {
        const checkIfIsAuthenticated = async () => {
            const authenticated = await isAuthenticated()

            navigate(authenticated ? "SelectServer" : "SelectServer")
        }

        checkIfIsAuthenticated()
    }, [])

    return (
        <AppLoading />
    )
}

export default AuthenticationLoading