'use client'

import Image from 'next/image'
import React from 'react'
import { FaRegUserCircle } from 'react-icons/fa'
import { AdminTextLink } from '@components/buttons'
import { AccountContext } from '@context/account'
import { AccountContextType } from '@context/types'
import { NormifyURL } from '@utils/normify-url'

const Page = () => {
  const {data} = React.useContext(AccountContext) as AccountContextType;
  return (
    <div>
      <h1 className='text-xl font-bold'>
        My Account
      </h1>
      <div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 my-4">
            <div className="flex flex-col rounded-xl bg-gray-100 dark:bg-gray-950 py-4 px-4">
                <div className='flex justify-center'>
                  {data.me?.setup.avatar ? 
                    <Image src={NormifyURL(data.me?.setup.avatar)} alt={data.me?.username} width={200} height={200} className='rounded-full'/>
                    :
                    <FaRegUserCircle size={200} className='text-orange-400'/>
                  }
                </div>
                <div className='mt-5 my-3 flex flex-col gap-y-2'>
                  {data.me?.firstName &&
                    <div>
                      {`${data.me?.firstName} ${data.me?.lastName}`} 
                    </div>
                  }
                  <p className='text-sm text-gray-400'>UserName: <span className='font-bold'>{data.me?.username}</span></p>
                  <p className='text-sm text-gray-400'>Email: <span className='font-bold'>{data.me?.email}</span></p>
                  <p className='text-sm text-gray-400'>Phone: <span className='font-bold'>{data.me?.setup.phoneNumber}</span></p>
                  <p className='text-sm text-gray-400'>Address: <span className='font-bold'>{data.me?.setup.address}</span></p>
                  {
                    data.me?.setup.memberNumber &&
                    <p className='text-sm text-gray-400'>Member Number: <span className='font-bold'>{data.me?.setup.memberNumber}</span></p>
                  }
                  <div className='mt-5 flex justify-between flex-wrap gap-2'>
                    <AdminTextLink link='/account/me/update' text='Update Account'/>
                    <AdminTextLink link='/account/me/change-password' text='Change Password'/>
                  </div>
                </div>
            </div>
            {/* <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
                <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
            </div>
            <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
                <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
            </div> */}
        </div>
      </div>
    </div>
  )
}

export default Page
