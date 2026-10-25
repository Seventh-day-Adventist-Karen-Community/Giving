'use client'

import React, {useEffect, useState} from 'react'
import { AdminTextLink } from '../../../../../components/buttons'
import { VscAdd } from 'react-icons/vsc'
import FetchDepartments from '../../../../../data/departments'
import CardStack from '../../../../../components/cardStacked'
import { NormifyURL } from '../../../../../utils/normify-url'
import { DepartmentsType } from '../../../../../types/department'

const Page = async ({ params,searchParams,}: {
    params: { id: string };
    searchParams?: { [key: string]: string | string[] | undefined }}) =>{
    const [departments, setDepartments] = useState<DepartmentsType[]>()

    useEffect(() => {
        const fetchData = async () =>{
            const {departments} = await FetchDepartments({parent: params.id})  
            setDepartments(departments)
        }
        fetchData()
    }, [params.id])
    
    
  return (
    <div>
        <div className='flex justify-between my-2'>
            <h1 className='text-xl font-bold'>
                Sub Departments Departments
            </h1>
            <AdminTextLink link={`/account/departments/${params.id}/sub/new`} text='New' icon={<VscAdd />} reverse/>
        </div>
       
        <div className='mx-auto max-w-7xl pt-1 py-7 px-2 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-950 rounded-3xl '>
            <p className='dark:text-gray-300 text-gray-500 mt-1'>{departments?departments.length: 0} Department(s) Found</p>
            <div className='py-4 flex md:flex-row gap-x-4 gap-y-8 flex-wrap justify-center xl:justify-between'> 
                {departments && departments?.map((department) =>{
                    return(
                        <div key={department.id}>
                         <CardStack dark title={department.title} key={department.id} image={NormifyURL(department.image)} excerpt={department.description} 
                                links={[{title:'View', link:`/account/departments/${department.id}`},{title:'Activities', link:`/account/departments/${department.id}/activities`},{title:'Edit', link:`/account/departments/${department.id}/edit`}]}/>
                        </div>
                    )
                })}
            </div>
        </div>
    </div>
  )
}


export default Page