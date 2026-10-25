'use client'

import React, {useState, useEffect, useContext} from 'react'
import GroupListItem from '@components/groups/group-list-item'
import FetchGroups from '@data/groups'
import { AdminTextLink } from '@components/buttons'
import { VscAdd } from 'react-icons/vsc'
import { AccountContext } from '@context/account'
import { AccountContextType } from '@context/types'
import Loading from '../loading'

const Page = async () => {
    const {data} = useContext(AccountContext) as AccountContextType;
    const {groups, loading} = await FetchGroups({leader:data.me?.id})    
    
  return (
    <div>
        <div className='flex justify-between my-2'>
            <h1 className='text-xl font-bold'>
                My Groups
            </h1>
            <AdminTextLink link='/account/groups/new' text='New' icon={<VscAdd />} reverse/>
        </div>
        {loading && 
            <Loading/>
        }
        <div className='mx-auto max-w-7xl pt-1 py-7 px-2 sm:px-2 lg:px-4 rounded-3xl '>
            <p className='dark:text-gray-300 text-gray-500 mt-1'>{groups.length} Groups Found</p>
            <div className='py-4 flex md:flex-row gap-x-4 gap-y-8 flex-wrap justify-center xl:justify-between'> 
                {groups?.map((group) =>{
                    return(
                        <GroupListItem key={group.id} group={group} dark admin/>
                    )
                })}
            </div>
        </div>
    </div>
  )
}


export default Page
