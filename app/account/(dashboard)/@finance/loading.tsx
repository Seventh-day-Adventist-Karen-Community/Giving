import React from 'react'
import { SkeletonLoader } from '../../loading'

const Loading = () => {
  return (
    <div className='flex flex-col gap-4'>
        <SkeletonLoader />
        <SkeletonLoader />
        <SkeletonLoader />
    </div>
  )
}

export default Loading