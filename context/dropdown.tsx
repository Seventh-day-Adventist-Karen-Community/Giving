'use client'

import React from 'react'
import { StatusContextType } from './types'


interface props {
    children: React.ReactNode
}

export const DropdownContext = React.createContext<StatusContextType | null>(null)

const DropdownProvider = ({children}: props) => {
    const [status, setStatus] = React.useState<boolean>(false)
    const open= () => {
        setStatus(true);
    }
    const close = () => {
        setStatus(false);
    }
    const toggle= () => {
        setStatus(!status);
    }
    return (
        <DropdownContext.Provider value={{status, open, close, toggle}}>
            {children}
        </DropdownContext.Provider>
    )
}

export default DropdownProvider

