import React from 'react'
import GroupListItemSkeleton from '../../../../components/groups/group-list-item-skeleton'

const Loading = () => {
  return (
    <div>
        <div className='bg-gray-100 '>
            <div className='mx-auto max-w-7xl pt-1 py-7 px-2 sm:px-6 lg:px-8'>
                <div>
                    <p className='text-gray-400'>Loading</p>
                </div>
                <div className='py-4 flex md:flex-row gap-x-4 gap-y-6 flex-wrap justify-center xl:justify-between'>               
                    <GroupListItemSkeleton />
                    <GroupListItemSkeleton />
                    <GroupListItemSkeleton />
                    <GroupListItemSkeleton />
                    <GroupListItemSkeleton />
                    <GroupListItemSkeleton />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Loading