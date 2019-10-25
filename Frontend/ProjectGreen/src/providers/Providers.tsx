import React, { Children, FunctionComponent } from 'react'
import AuthenticationProvider from './AuthenticationProvider'

const Providers: FunctionComponent = ({children}) => {
    return (
        <AuthenticationProvider>
            {children}
        </AuthenticationProvider>
    )
}

export default Providers