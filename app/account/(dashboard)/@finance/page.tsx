'use client'

import React, { useContext} from 'react'
import { AccountContext } from '@context/account'
import { AccountContextType, AuthContextType } from '@context/types'
import { Constants } from '@utils/constants'
import { NormifyTimeStatement } from '@utils/normify-url'

const Page = () => {

    const Account = useContext(AccountContext) as AccountContextType
  return (
    <div>
        <h2 className="text-2xl font-bold mb-4">Summary</h2>

        <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
                <div className="p-4 bg-green-100 rounded-xl">
                    <div className="font-bold text-xl text-gray-800 leading-none">{NormifyTimeStatement()}, <br/>{Account.data.me?.firstName ? `${Account.data.me.firstName} ${Account.data.me.lastName}`:Account.data.me?.username}</div>
                    <div className="mt-5">
                        <a target="_blank" rel="noopener noreferrer" href={Constants.GIVING_URL} className="inline-flex items-center justify-center py-2 px-3 rounded-xl bg-white text-gray-800 hover:text-green-500 text-sm font-semibold transition">
                            Start Giving
                        </a>
                    </div>
                </div>
            </div>
            <div className="p-4 bg-yellow-100 rounded-xl text-gray-800">
                <div className="font-bold text-xl leading-none font-mono">0.00</div>
                <div className="mt-2">Last Month</div>
            </div>
            <div className="p-4 bg-yellow-100 rounded-xl text-gray-800">
                <div className="font-bold text-xl leading-none font-mono">0.00</div>
                <div className="mt-2">Current Month</div>
            </div>
            <div className="col-span-2">
                <div className="p-4 bg-purple-100 rounded-xl text-gray-800">
                    <div className="font-bold text-xl leading-none font-mono">0.00</div>
                    <div className="mt-2">Average Monthly Giving</div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Page