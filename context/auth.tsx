'use client'

import {  removeCookies, setCookie } from 'cookies-next'
import React from 'react'
import { Authenticated, Token } from '../utils/client-constants'
import { AuthContextType } from './types'

interface props {
    children: React.ReactNode
}

export const AuthContext = React.createContext<AuthContextType | null>(null)
const CookieToken = Token ? `${Token}`:''
const authenticated = Authenticated && typeof Authenticated?Authenticated:false
const AuthProvider = ({children}: props) => {
    const [status, setStatus] = React.useState<boolean|string>(authenticated)
    const [token, setToken] = React.useState<string>(CookieToken)
    const login= (apiToken:string) => {
        setStatus(true);
        setToken(apiToken)
        setCookie('token', apiToken)
        setCookie('authenticated', true)
    }
    const authenticate = (log: boolean) =>{
        setStatus(log)
        setCookie('authenticated', log)
    }
    const logout = (path:string|null) => {
        setStatus(false);
        removeCookies('token');
        removeCookies('authenticated');
        setToken('')
        if(path)
            window.location.href = '/auth/login?next='+path;
        else
            window.location.href= '/auth/login'
    }
    const toggle= () => {
        setStatus(!status);
    }
    return (
        <AuthContext.Provider value={{status,token, login, logout, toggle, authenticate}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
