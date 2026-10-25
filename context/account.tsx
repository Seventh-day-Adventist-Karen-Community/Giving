 
'use client'

import React from 'react'
import { MeType } from '../types/me'
import { AccountContextType } from './types'
import { getUser } from '@app/lib/dal'

interface props {
    children: React.ReactNode
}

export const AccountContext = React.createContext<AccountContextType | null>(null)

const AccountProvider = ({children}: props) => {
    const [me, setMe] = React.useState<MeType>()
    const setCMe = () => {
        // This function can be used to update or log the 'me' state
        console.log(me);
    }

    const GetCurrUser = React.useCallback(async ()=>{
        const user = await getUser()
        console.log(user)
        if(user)
            setMe(user)
    },[])

    React.useEffect(()=>{
        GetCurrUser()
    },[GetCurrUser])
    
    return (
        <AccountContext.Provider value={{data:{me: me}, setCMe}}>
            {children}
        </AccountContext.Provider>
    )
}

export default AccountProvider
