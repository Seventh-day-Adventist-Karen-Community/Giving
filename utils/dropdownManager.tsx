'use client'

import React from 'react'
import { DropdownContext } from '../context/dropdown'
import { MenuContext } from '../context/menu'
import { StatusContextType } from '../context/types'

interface props {
    children: React.ReactNode
}

const DropdownManager = ({children}: props) => {
    const dropdown = React.useContext(DropdownContext) as StatusContextType;
    const menu = React.useContext(MenuContext) as StatusContextType;
    const closeDropdowns = React.useCallback(
      () => {
        try{
          dropdown.close()
          menu.close()
        } catch{

        }
      },
      [dropdown, menu],
    )

    
  return (
    <div onClick={() => closeDropdowns()} onLoad={() => closeDropdowns()} onLoadStart={closeDropdowns} className='transition-all'>
        {children}
    </div>
  )
}

export default DropdownManager

