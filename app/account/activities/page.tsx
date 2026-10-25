'use client'

import React, { useContext } from 'react'
import FetchActivities, { ChangeActivityStatus, DeleteActivity } from '@data/activities';
import { ActivityType } from 'types/activities';
import Table, { Irow, TableActionType } from '@components/table'
import { ActivityStatusChoicesKeys, ActivityStatusChoicesValues } from 'types/enums';
import { BsEye } from 'react-icons/bs';
import { BiAddToQueue, BiEdit, BiTrash } from 'react-icons/bi';
import { usePathname, useRouter } from 'next/navigation';
import { ConfirmContext, ConfirmContextType } from '@components/confirm/context';
import { MessageContext, MessagesContextType } from '@components/toast/context';
import { AccountContext } from '@context/account';
import { AccountContextType } from '@context/types';

const Page =  async () =>{

  const router = useRouter()
  const path = usePathname()
  const Account = useContext(AccountContext) as AccountContextType
  const dialog = useContext(ConfirmContext) as ConfirmContextType
  const Messages = useContext(MessageContext) as MessagesContextType
  const {activities} = await FetchActivities({})
  
  const ChangeStatus = async (selected_option: string, selected: Irow[]) =>{
    try{
        let select_option_index = ActivityStatusChoicesKeys.indexOf(selected_option)
        if(select_option_index === -1){
          Messages.setAlert('No Action Option selected!')
        }
        let select_option_value = ActivityStatusChoicesValues[select_option_index]
        let selected_values = selected.map(selection=>{
          return(selection.id)
        })
        const success = await ChangeActivityStatus({status:select_option_value, activityIdList:selected_values})
        if(success)
          Messages.setSuccess(success)
        else
          Messages.setSuccess('QuerySet Executed successfully')
        window.location.href = path || './activities';
    }
    catch(e:any){
        console.error(e)
        if(e['networkError']){
            Messages.setErrors(e['networkError'])
        }
        if(e['message']){
            Messages.setErrors(e['message'].split('\n')[0])
      }
    }
  }
  const DeleteMutation =async(data:ActivityType)=>{
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
const DeleteRecord =(id:string)=>{
    const data = activities.filter(activity=> activity.id === id)[0]
    dialog.setConfirmMessage(`Do you wish to delete activity No. ${data.no}, ${data.title}`, '',() => DeleteMutation(data))
}
  const Actions = [
    {
    type: TableActionType.Link, 
    // name:'View', 
    title:'View', 
    icon: <BsEye size={20}/>, 
    basePath:'/account/activities/', 
    className: 'text-yellow-400 focus:ring-2 focus:ring-yellow-400',
    visible: true
    // action?:rowActionFunc
  },
  {
    type: TableActionType.Link, 
    // name:'View', 
    title:'Edit', 
    icon: <BiEdit size={20}/>, 
    basePath:'/account/activities/', 
    className: 'text-blue-400 focus:ring-2 focus:ring-blue-400',
    pathSuffix: '/edit',
    visible: false
    // action?:rowActionFunc
  },
  {
    type: TableActionType.Action, 
    // name:'View', 
    title:'Delete', 
    icon: <BiTrash size={20}/>, 
    basePath:'/account/activities/', 
    className: 'text-red-400 focus:ring-2 focus:ring-red-400',
    visible: false,
    action:(id:string) => DeleteRecord(id)
  },
]
  // console.log(activities)
  return (
    // <div className='mx-auto max-w-7xl py-7 px-2 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800 rounded-3xl '>
      <Table columns={column()} rows={activities || []} 
            table_header= {`All Activities`}  export_csv_file={`All Activities`}
            bulk_select_options={ActivityStatusChoicesKeys}
            use_row_actions
            on_bulk_action={(selected_option: string, selected: Irow[])=> ChangeStatus(selected_option, selected)} 
            row_actions= {Actions}
            other_links = {[{link: `/account/activities/new`, name:'New', title:'New', icon:<BiAddToQueue />}]}
            />
    // </div>
  )
}
function column() {
  return [
    {
      use_in_display: false,
      field: "id",
      primary: true
    }, 
    {
      use_in_display: true,
      field: "no",
      use: "No.",
      user_primary: true,
      use_in_sorting: true
    },
    {
       use_in_display: true,
      field: "title", //Object destructure
      use: "Title",
      use_in_search: true,
      use_in_sorting: true
    },
    {
      field: "startDate",
      use: "Start Date",
      use_in_search:true,
      use_in_sorting: true
    },
    {
      field: "endDate",
      use: "End Date",
      use_in_search:true,
      use_in_sorting: true
    },
    {
      field: "slots",
      use: "Slots",
      use_in_search:true,
      use_in_sorting: true
    },
    {
      field: "amount",
      use: "Amount",
      use_in_search:false,
      use_in_sorting: true
    },
    {
      field: "status",
      use: "Status",
      use_in_search:true,
      use_in_sorting: true
    },
    {
      field: "canModify",
      use_in_visibility: true,
      use_in_display: false,
      use_in_sorting: true
    }
  ]
}

export default Page
