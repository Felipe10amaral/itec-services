import {createContext, useCallback, useContext, useState} from 'react'
import api from '../services/api'

interface AuthState {
    token: string;
    username: string;
}

interface CredentialsProps {
    email: string
    password: string
}

interface ContextProps {
    username: string
    signIn(credentials: CredentialsProps): Promise<void>
    signOut(): void
    token?: string | null
}
 
const AuthContext = createContext<ContextProps>({} as ContextProps)

export function AuthProvider ({children}: any)  {
    const [ data, setData] = useState<AuthState>(() => {
        const token = localStorage.getItem('@itec.token')
        const username = localStorage.getItem('@itec.username')

        if(token && username) {
            api.defaults.headers.authorization = `Bearer ${token} `
            return {token, username}
        }

        return {} as AuthState
    })
    const signIn = useCallback(async ({email, password}: CredentialsProps) => {
        const response = await api.post('users/authorization', {
            email, password
        })

        const {user} = response.data
        const {token, username} = user
        
        localStorage.setItem('@itec.token', token)
        localStorage.setItem('@itec.username', username)

        setData({ token, username})
    },[])

    const signOut = useCallback(() => {
        localStorage.removeItem('@itec.token')
        localStorage.removeItem('@itec.username')

        setData({} as AuthState)
    }, [])

    const token = localStorage.getItem('@itec.token')

    return (
        <AuthContext.Provider value={{username: data.username, signIn, signOut, token}}>
            {children}
        </AuthContext.Provider>
    )
}


export function useAuth(): ContextProps {
    const context = useContext(AuthContext)
    
    

    if(!context) {
        throw new Error("useAuth must be used within authProvider")
    }

    return context
}

