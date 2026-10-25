'use client'

import Link from 'next/link'
import React, {useContext} from 'react'
import { BiAnalyse } from 'react-icons/bi'
import { VscWorkspaceTrusted } from 'react-icons/vsc'
import { AccountContext } from '../../context/account'
import { AccountContextType } from '../../context/types'


const ProtectedAccountMenuList = ({linkClassName, iconClassName}:{linkClassName: string, iconClassName: string}) => {
    const Account = useContext(AccountContext) as AccountContextType
    
  return (
    <>
    {Account.data.me?.setup?.isAnalyticAdmin &&
    <>
      <li>
          <Link href="/account/analytic" className={linkClassName}>
          <BiAnalyse size={20} className={iconClassName}   />
          <span className="flex-1 ml-3 whitespace-nowrap">Analytics</span>
          </Link>
      </li>
      
    </>      
    }
    {Account.data.me?.isStaff &&
      <li>
        <Link href="/account/beliefs" className={linkClassName}>
        <VscWorkspaceTrusted size={20} className={iconClassName}   />
        <span className="flex-1 ml-3 whitespace-nowrap">Beliefs</span>
        </Link>
    </li>
    }
    </>
  )
}

export default ProtectedAccountMenuList