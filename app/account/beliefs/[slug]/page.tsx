'use client'

import { notFound, useRouter } from 'next/navigation';
import React, {useContext} from 'react'
import { BiAddToQueue, BiEdit, BiTrash } from 'react-icons/bi';
import { AdminTextButtonPlain, AdminTextLinkPlain } from '@components/buttons';
import { ConfirmContext, ConfirmContextType } from '@components/confirm/context';
import { MessageContext, MessagesContextType } from '@components/toast/context';
import FetchAdventistBeliefs, { DeleteBeliefs } from '@data/adventist_beliefs';
import { BeliefsType } from 'types/detailsType';

const FetchBelief = async (pslug:string) =>{
    let data = FetchAdventistBeliefs(pslug)
    return(data)
  }

const Page = async ({ params, searchParams,}:{
        params: { slug: string };
        searchParams?: { [key: string]: string | string[] | undefined };
    }) => {
  const router = useRouter()
  const Messages = useContext(MessageContext) as MessagesContextType
  const dialog = useContext(ConfirmContext) as ConfirmContextType
  const beliefs = await FetchBelief(params.slug)
    if (beliefs == undefined){
      return notFound()
    }
    let belief:BeliefsType = beliefs[0]
    const DeleteMutation =async()=>{
        try{
            const status = await DeleteBeliefs(belief) 
            if(status.success){
                Messages.setSuccess(`Successfully deleted belief ${belief.name}`)
                router.back()
            } else{
                Messages.setErrors(`Failed to delete belief ${belief.name}`)
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
        dialog.setConfirmMessage(`Do you wish to delete belief ${belief.name}`, '',() => DeleteMutation())
    }
  return (
    <div className=" shadow-md rounded-3xl px-4 py-4 mb-5">
        <div className='mb-2'>
            <h1 className='text-2xl font-bold capitalize'>{belief.name}</h1>
        </div>
        <div className='flex flex-col xs:flex xs:flex-row justify-between w-full'>
            <div className='flex flex-row justify-between sm:justify-start py-1 border rounded-md border-slate-400 dark:border-slate-500 px-2'>
                <AdminTextLinkPlain  link={`/account/beliefs/new`} text='New' icon={<BiAddToQueue />} reverse/>     
                {belief.canModify &&
                    <AdminTextLinkPlain  link={`/account/beliefs/${belief.slug}/edit`} text='Edit' icon={<BiEdit />} reverse/>           
                }      
                <AdminTextButtonPlain type='button' onClick={()=> DeleteRecord()} title='Delete' text='Delete' icon={<BiTrash/>} reverse/>
            </div>
        </div>
            <div className='flex flex-col gap-y-2 pt-2'>
                <h1 className='text-lg font-bold'>
                    {`Category: ${belief.categoryName}`}
                </h1>
            </div>
        <div className='my-3'>
            <div dangerouslySetInnerHTML={{__html:belief.content}}>
            </div>
        </div>
    </div>
  )
}

export default Page
