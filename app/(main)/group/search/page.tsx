import React from 'react'
import GroupListItem from '../../../../components/groups/group-list-item'
import FetchGroups, { FetchAcceptedGroupCount } from '../../../../data/groups'
import data from '../../../../data/groups.json'
import { Constants } from '../../../../utils/constants'

export const revalidate = 3600;

const FetchData = async () =>{
    return {count:await FetchAcceptedGroupCount(),data:await FetchGroups({})}
}

const Page = async () => {
    const {count, data} = await FetchData()
    
  return (
    <div>
        <div className='bg-gray-100 '>
            <div className='mx-auto max-w-7xl pt-1 py-7 px-2 sm:px-6 lg:px-8'>
                <div>
                    <p className='text-gray-400'>{count ? `${count} Results Found`: "No Active Prayer Cell Found"}</p>
                </div>
                <div className='py-4 flex md:flex-row gap-x-4 gap-y-8 flex-wrap justify-center xl:justify-between'>
                    {data.groups.map((group) =>{
                        return(
                            <GroupListItem key={group.id} group={group}/>
                        )
                    })}
                </div>
            </div>
        </div>
    </div>
  )
}


export default Page