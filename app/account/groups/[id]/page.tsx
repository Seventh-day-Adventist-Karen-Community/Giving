'use client'

import { notFound } from 'next/navigation';
import React from 'react'
import { BiAddToQueue, BiEdit } from 'react-icons/bi';
import { CgUserList } from 'react-icons/cg';
import { AdminTextLinkPlain } from '../../../../components/buttons';
import {  FetchGroup } from '../../../../data/groups'

const Page = async ({ params,searchParams,}: {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined }}) =>{
    const data = await FetchGroup(params)
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
                <AdminTextLinkPlain  link={`/account/groups/new`} text='New' icon={<BiAddToQueue />} reverse/>     
                {data.canModify &&
                    <AdminTextLinkPlain  link={`/account/groups/${data.id}/edit`} text='Edit' icon={<BiEdit />} reverse/>           
                }      
                <AdminTextLinkPlain  link={`/account/groups/${data.id}/members`} title='Members' text='Members' icon={<CgUserList/>} reverse/>
            </div>
        </div>
            <div className='flex flex-col gap-y-2 pt-2'>
                <h1 className='text-lg font-bold'>{data.details}</h1>
                <h2 className='text-md text-gray-500'>{data.location}</h2>
            </div>
        <div className='my-3'>
            <div dangerouslySetInnerHTML={{__html:data.description}}>
            </div>
            <div className='flex flex-row justify-center md:justify-between gap-x-2 gap-y-5 flex-wrap my-6'>
                <CategoryComponent title='Age' description={data.ageGroup}/>
                <CategoryComponent title='Community Type' description={data.category}/>
                <CategoryComponent title='Are Children Allowed' description={data.kidsAllowed?'YES':'NO'}/>
                <CategoryComponent title='Schedule' description={`${data.days} at ${data.time}`}/>
                <CategoryComponent title='Leaders' description={data.leaders?.map(leader =>{return (leader.fullName +', ')})}/>
                <CategoryComponent title='Location' description={data.location}/>
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