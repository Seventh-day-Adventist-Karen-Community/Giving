'use client'

import Image from 'next/image';
import { notFound, useRouter } from 'next/navigation';
import React, { useContext } from 'react'
import { BiAddToQueue, BiEdit, BiTrash } from 'react-icons/bi';
import { AdminTextLinkPlain, AdminTextButtonPlain } from '../../../../components/buttons';
import { ConfirmContext, ConfirmContextType } from '../../../../components/confirm/context';
import { MessageContext, MessagesContextType } from '../../../../components/toast/context';
import { AccountContext } from '../../../../context/account';
import { AccountContextType } from '../../../../context/types';
import { DeleteActivity, FetchActivity } from '../../../../data/activities';
import { NormifyURL } from '../../../../utils/normify-url';

const Page = async ({ params }: {
  params: { id: string }}) =>{

    const router = useRouter()
    const dialog = useContext(ConfirmContext) as ConfirmContextType
    const Messages = useContext(MessageContext) as MessagesContextType
    const Account = useContext(AccountContext) as AccountContextType
    const data = await FetchActivity(params)
    // console.log(data)
    if(!data){
        return notFound()
    }
    const DeleteMutation =async()=>{
        try{
            const status = await DeleteActivity(data) 
            if(status.success){
                Messages.setSuccess(`Successfully deleted activity No. ${data.no}, ${data.title}`)
                router.back()
            } else{
                Messages.setErrors(`Failed to delete activity No. ${data.no}, ${data.title}`)
            }
        } catch(e:any){
            console.log(e)
            if(e['networkError']){
                Messages.setErrors([e['networkError']])
            }
            if(e['message']){
                Messages.setErrors([e['message'].split('\n')[0]])
            }   
        }
    }
    const DeleteRecord =()=>{
        dialog.setConfirmMessage(`Do you wish to delete activity No. ${data.no}, ${data.title}`, '', DeleteMutation)
    }
  return (  
    <div className=" shadow-md rounded-3xl px-4 py-4 mb-5">
        <div className='mb-2'>
            <h1 className='text-2xl font-bold capitalize'>{data.title}</h1>
        </div>
        <div className='flex flex-col xs:flex xs:flex-row justify-between w-full'>
            <div className='flex flex-row justify-between sm:justify-start py-1 border rounded-md border-slate-400 dark:border-slate-500 px-2'>
                { Account.data.me?.isStaff &&
                    <AdminTextLinkPlain link={`/account/activities/new`} text='New' icon={<BiAddToQueue />} reverse/>
                }   
                {
                    data.canModify &&
                    <>
                        <AdminTextLinkPlain link={`/account/activities/${data.id}/edit`} text='Edit' icon={<BiEdit />} reverse/>           
                        <AdminTextButtonPlain type='button' onClick={()=> DeleteRecord()} title='Delete' text='Delete' icon={<BiTrash/>} reverse/>
                    </>
                }        
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
            <div className='flex flex-row justify-center md:justify-between gap-x-2 gap-y-5 flex-wrap my-6'>
                <CategoryComponent title='Start Date' description={data.startDate.toLocaleString()}/>
                <CategoryComponent title='End Date' description={data.endDate.toLocaleString()}/>
                <CategoryComponent title='Type' description={data.activityType}/>
                {data.department &&
                    <CategoryComponent title='Department' description={data.department.title}/>
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