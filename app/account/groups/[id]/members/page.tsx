'use client'

import { usePathname, useRouter } from 'next/navigation';
import React,{useState, useEffect, useContext, useTransition} from 'react'
import Table, { Irow } from '../../../../../components/table'
import { MessageContext,MessagesContextType } from '../../../../../components/toast/context';
import { FetchGroup } from '../../../../../data/groups';
import { ChangeGroupMembersStatus, FetchGroupMembers } from '../../../../../data/join-member';
import { GroupActionChoicesKeys, GroupActionChoicesValues } from '../../../../../types/enums';
import { GroupMemberType } from '../../../../../types/groupMemberType';
import { GroupType } from '../../../../../types/groupType';

const Page = ({ params,searchParams,}: {
    params: { id: string };
    searchParams?: { [key: string]: string | string[] | undefined }}) =>{
    const Messages = useContext(MessageContext) as MessagesContextType
    const [groupMembers, setGroupMembers] = useState<GroupMemberType[]>()
    const [group, setGroup] = useState<GroupType>()
    const path = usePathname()
    const ChangeStatus = async (selected_option: string, selected: Irow[]) =>{
      try{
          let select_option_index = GroupActionChoicesKeys.indexOf(selected_option)
          if(select_option_index === -1){
            Messages.setAlert('No Action Option selected!')
          }
          let select_option_value = GroupActionChoicesValues[select_option_index]
          let selected_values = selected.map(selection=>{
            return(selection.id)
          })
          const success = await ChangeGroupMembersStatus({status:select_option_value, memberIdList:selected_values})
          if(success)
            Messages.setSuccess(success)
          else
            Messages.setSuccess('QuerySet Executed successfully')
          window.location.href = path || './members';
          // router.replace(path||'./members')
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

    useEffect(() => {
      const fetchMemberGroup = async() =>{
        const gp = await FetchGroup({id: params.id})
        setGroup(gp)
        if(gp?.no){
              const members = await FetchGroupMembers(gp.no);
              setGroupMembers(members)
            }
        }        
        fetchMemberGroup();
    }, [params.id])
  return (
    // <div className='mx-auto max-w-7xl py-7 px-2 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800 rounded-3xl '>
      <Table columns={column()} rows={groupMembers || []} 
            table_header= {`Members of ${group?.title ?? '----'}`}  export_csv_file={`Members of ${group?.title ?? '----'}`}
            bulk_select_options={GroupActionChoicesKeys}
            on_bulk_action={(selected_option: string, selected: Irow[])=> ChangeStatus(selected_option, selected)} />
    // </div>
  )
}
function column() {
    return [
      {
        use_in_display: true,
        field: "no",
        use: "No."
      },
      {
         use_in_display: true,
        field: "firstName", //Object destructure
        use: "First Name"
      },
      {
        field: "lastName",
        use: "Last Name",
        use_in_search:true
      },
      {
        field: "email",
        use: "Email",
        use_in_search:true
      },
      {
        field: "phoneNumber",
        use: "Phone Number",
        use_in_search:true
      },
      {
        field: "status",
        use: "Status",
        use_in_search:true
      },
    ]
}

export default Page