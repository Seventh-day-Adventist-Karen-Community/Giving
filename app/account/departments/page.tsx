'use client'

import React, {useState, useEffect, useContext} from 'react'
import { AdminTextLink } from '../../../components/buttons'
import { BiAddToQueue, BiEdit } from 'react-icons/bi';
import { BsActivity, BsEye } from 'react-icons/bs';
import { AccountContext } from '../../../context/account'
import { AccountContextType } from '../../../context/types'
import { FetchLeaderDepartment } from '../../../data/departments'
import CardStack from '../../../components/cardStacked'
import { NormifyURL } from '../../../utils/normify-url'

const Page = async () => {
    const Account = useContext(AccountContext) as AccountContextType
    const {leaderDepartments } = await FetchLeaderDepartment({leader:Account.data?.me?.leader?.id})  
    
  return (
    <div>
        <div className='flex justify-between my-2'>
            <h1 className='text-xl font-bold'>
                My Departments
            </h1>
            {Account.data.me?.isStaff &&
                <AdminTextLink link='/account/departments/new' text='New' icon={<BiAddToQueue />} reverse/>
            }
        </div>
       
        <div className='mx-auto max-w-7xl pt-1 py-7 px-2 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-930 rounded-3xl '>
            <p className='dark:text-gray-300 text-gray-500 mt-1'>{leaderDepartments? leaderDepartments.departments? leaderDepartments.departments.length:0: 0} Department(s) Found</p>
            <div className='py-4 flex md:flex-row gap-x-4 gap-y-8 flex-wrap justify-center xl:justify-between'> 
                {leaderDepartments && leaderDepartments.departments && leaderDepartments.departments?.map((department) =>{
                    return(
                        <div key={department.id}>
                         <CardStack dark title={department.department.title} key={department.id} image={NormifyURL(department.department.image)} excerpt={department.department.description} 
                                links={[
                                    {title:'View', link:`/account/departments/${department.department.id}`, icon:<BsEye />, visible: true},
                                    {title:'Activities', link:`/account/departments/${department.department.id}/activities`, icon:<BsActivity />, visible: true},
                                    {title:'Edit', link:`/account/departments/${department.department.id}/edit`, icon:<BiEdit />, visible: department.department.canModify}
                                   ]}/>
                        </div>
                    )
                })}
            </div>
        </div>
    </div>
  )
}


export default Page