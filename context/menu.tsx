'use client'

import React from 'react'
import { StatusContextType } from './types'

interface props {
    children: React.ReactNode
}

export const MenuContext = React.createContext<StatusContextType | null>(null)

const MenuProvider = ({children}: props) => {
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
        <MenuContext.Provider value={{status, open, close, toggle}}>
            {children}
        </MenuContext.Provider>
    )
}

export default MenuProvider