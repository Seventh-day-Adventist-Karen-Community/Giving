'use client'

import Image from 'next/image';
import { notFound } from 'next/navigation';
import React from 'react'
import { BiAddToQueue, BiEdit } from 'react-icons/bi';
import { BsActivity } from 'react-icons/bs';
import { FcDepartment } from 'react-icons/fc';
import { AdminTextLinkPlain } from '../../../../components/buttons';
import { FetchDepartment } from '../../../../data/departments';
import { NormifyURL } from '../../../../utils/normify-url';

const Page = async ({ params,searchParams,}: {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined }}) =>{
    const data = await FetchDepartment(params)
    if(!data){
        return notFound()
    }
  return (  
    <div className=" shadow-md rounded-3xl px-4 py-4 mb-5">
        <div className='mb-2'>
            <h1 className='text-2xl font-bold capitalize'>{data.title}</h1>
        </div>
        <div className='flex flex-col xs:flex xs:flex-row justify-between w-full'>
            <div className='flex flex-row justify-between sm:justify-start py-1 border rounded-md border-slate-400 dark:border-slate-500 px-2'>
                <AdminTextLinkPlain  link={`/account/departments/new`} text='New' icon={<BiAddToQueue />} reverse/>  
                {
                data.canModify &&
                    <AdminTextLinkPlain  link={`/account/departments/${data.id}/edit`} text='Edit' icon={<BiEdit />} reverse/>           
                }         
                <AdminTextLinkPlain  link={`/account/departments/${data.id}/activities`} title='Activities' text='Activities' icon={<BsActivity/>} reverse/>
                <AdminTextLinkPlain  link={`/account/departments/${data.id}/sub`} title='Sub Departments' text='Sub Departments' icon={<FcDepartment/>} reverse/>
            </div>
        </div>
            <div className='flex flex-col gap-y-2 pt-2 pb-1'>
                <h1 className='text-lg font-bold'>No.  {data.no}</h1>
            </div>
            {data.image &&
                <div>
                    <Image width={1000} height={700} className="w-full max-h-96 object-cover self-center rounded shadow-lg" src={NormifyURL(data.image)} alt={data.title} loading='lazy' quality={100}/>
                </div>
            }
        <div className='my-3'>
            <div dangerouslySetInnerHTML={{__html:data.description}}>
            </div>
            <div className=' my-6'>
                <h3 className='text-md font-bold w-full md:w-60 text-gray-800 dark:text-gray-300'>Leaders</h3>
                <div className='flex flex-row justify-center md:justify-between gap-x-2 gapy-y-2 flex-wrap'>
                {data.leaders?.map((leader)=>{return(
                    <p  className='w-full md:w-80 text-gray-800 dark:text-gray-300' key={leader.id}>
                        {leader.fullName + ' - ' + leader.position}
                    </p>
                ) })}
                </div>
            </div>
            
            <div className='flex flex-row justify-center md:justify-between gap-x-2 gap-y-5 flex-wrap my-6'>
                <CategoryComponent title='Type' description={data.deptType}/>
                {data.parent &&
                    <CategoryComponent title='Parent Department' description={data.parent.title}/>
                }
            </div>
        </div>
    </div>
  )
}

const CategoryComponent = ({title,description}:{title:string, description?:string|string[]}) =>{
    return(
        <div className='w-full md:w-60 text-gray-800 dark:text-gray-300'>
            <h3 className='text-md font-bold'>{title}</h3>
            <p>{description}</p>
        </div>
    )
}

export default Page