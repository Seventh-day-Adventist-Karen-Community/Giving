'use client'

import Link from 'next/link'
import React, { useContext} from 'react'
import { BsBell } from 'react-icons/bs'
import { AccountContext } from '@context/account'
import { AccountContextType } from '@context/types'
import AdminDropdown from '../admin-dropdown'
import UserAvatar from './user-avatar'
import { logout } from '@app/actions/auth'

const UserMenu = () => {
    const currUser = useContext(AccountContext) as AccountContextType
    
// console.log(currUser.data.me?.username)
  return (
    <div className="flex items-center max-w-xs gap-x-3">
        <AdminDropdown name='Notification' icon={<BsBell size={23} />}>
            <li className='px-2'>No Notification</li>
        </AdminDropdown>
        <AdminDropdown name='Open user menu' icon={<UserAvatar setup={currUser?.data.me?.setup} username={currUser?.data.me?.username} width={25} height={25}/> }>
            {currUser?.data.me && 
                <div className="px-4 py-3" role="none">
                    <p className="text-sm text-gray-980 dark:text-white" role="none">
                        {currUser.data.me?.firstName != ''?
                            currUser.data.me?.firstName + ' ' +currUser.data.me?.lastName
                        :
                            currUser.data.me?.username
                        }
                    </p>
                    <p className="text-sm font-medium text-slate-900 truncate dark:text-slate-300" role="none">
                        {currUser.data.me?.email}
                    </p>
                    <hr className='mt-2 dark:border-slate-400'/>
                </div>
                }
                <MenuItem href='/account' Name='Dashboard' />
                <MenuItem href='/account/me' Name='Profile' />
                <MenuItem href='/account' Name='Settings' />
                <MenuItem href='' onClick={logout} Name='Sign Out'/>
        </AdminDropdown>
    </div>
  )
}

export default UserMenu

const MenuItem = ({href, Name, onClick}:{href:string, Name:string, onClick?: Function}) => {
    const clickFunction = ()=>{
        onClick && onClick()
    }
  return (
    <li onClick={clickFunction}>
        <Link href={href} className="block px-4 py-2 text-sm text-gray-700 hover:bg-slate-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">{Name}</Link>
    </li>
  )
}
