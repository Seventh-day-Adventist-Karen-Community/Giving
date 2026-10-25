'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, {useContext} from 'react'
import UserAvatar from '@components/account/user-menu/user-avatar'
import { AccountContext } from '@context/account'
import { AccountContextType } from '@context/types'

const Page = () => {
    const Account = useContext(AccountContext) as AccountContextType
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-stretch">
                <div className="text-slate-400 text-xs">Members<br/>connected</div>
                <div className="h-100 border-l mx-4"></div>
            </div>
            <div className="flex items-center gap-x-2">
                <UserAvatar setup={Account?.data.me?.setup} username={Account?.data.me?.username} width={30} height={30}/>
                <Link href={'/account/me'} className="inline-flex items-center justify-center h-9 px-5 rounded-xl bg-gray-900 text-gray-300 hover:text-white text-sm font-semibold transition">
                    Profile
                </Link>
            </div>
        </div>

    )
}

export default Page