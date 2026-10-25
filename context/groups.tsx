'use client'

import React from 'react'
import { PaginationType } from '../types/paginationType'
import { GroupsContextType} from './types'


interface props {
    children: React.ReactNode
}

export const DropdownContext = React.createContext<GroupsContextType>({
    status:{

        endCursor:'',
        startCursor:'',
        hasNextPage: false,
        hasPreviousPage: false
    }
})

const DropdownProvider = ({children}: props) => {
    const [status, setStatus] = React.useState<PaginationType>()
    const settStatus= (data:PaginationType) => {
        setStatus({
            endCursor:data.endCursor,
            startCursor:data.startCursor,
            hasNextPage: data.hasNextPage,
            hasPreviousPage: data.hasPreviousPage
        });
    }
   const clearStatus= () => {
        setStatus({
            endCursor:'',
            startCursor:'',
            hasNextPage: false,
            hasPreviousPage: false
        });
    }
   
    return (
        // <DropdownContext.Provider value={{status, settStatus, clearStatus}}>
            {children}
        // </DropdownContext.Provider>
    )
}

export default DropdownProvider