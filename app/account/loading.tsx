import Image from 'next/image'
import React from 'react'

const Loading = () => {
  return (
    <div>
      <div>
        <div className="grid xs:grid-cols-2 sm:grid-cols-3 gap-4 my-4 ">
            <SkeletonLoader />
            <SkeletonLoader />
            <SkeletonLoader />
        </div>
        <SkeletonLoader2 />
        <SkeletonLoader3 />
      </div>
    </div>
  )
}

export default Loading

export const SkeletonLoader = ()=>{
  return(
    <div className="flex flex-col rounded bg-gray-50 dark:bg-gray-950 py-4 px-4">
        <div className='my-3 flex flex-col gap-y-2'>
          <p className='text-xs italic dark:bg-gray-920 bg-slate-200 rounded-lg h-4 w-full animate-pulse'></p>
          <p className='text-xs italic dark:bg-gray-920 bg-slate-200 rounded-lg h-6 w-full animate-pulse'></p>
          <p className='text-xs italic dark:bg-gray-920 bg-slate-200 rounded-lg h-4 w-full animate-pulse'></p>
          <p className='text-xs italic dark:bg-gray-920 bg-slate-200 rounded-lg h-6 w-full animate-pulse'></p>
        </div>
    </div>
  )
}
const SkeletonLoader2 = ()=>{
  return(
    <div className="w-full flex flex-col rounded bg-gray-50 dark:bg-gray-950 py-4 px-4">
        <div className='my-3 flex flex-col gap-y-2'>
          <p className='text-xs italic dark:bg-gray-920 bg-slate-200 rounded-lg h-4 w-full animate-pulse'></p>
          <p className='text-xs italic dark:bg-gray-920 bg-slate-200 rounded-lg h-6 w-full animate-pulse'></p>
          <p className='text-xs italic dark:bg-gray-920 bg-slate-200 rounded-lg h-26 w-full animate-pulse'></p>
        </div>
    </div>
  )
}

const SkeletonLoader3 = ()=>{
  return(        
    <div role="status" className="w-full p-4 space-y-4 divide-y divide-gray-200 rounded shadow animate-pulse bg-gray-50 dark:bg-gray-950 dark:divide-gray-950 md:p-6">
        <div className="flex items-center justify-between">
            <div>
                <div className="h-2.5 bg-slate-300 rounded-full dark:bg-gray-920 mx-w-64 mb-2.5"></div>
                <div className="w-32 h-2 bg-slate-200 rounded-full dark:bg-gray-930"></div>
            </div>
            <div className="h-2.5 bg-slate-300 rounded-full dark:bg-gray-930 w-12"></div>
        </div>
        <div className="flex items-center justify-between pt-4">
            <div>
                <div className="h-2.5 bg-slate-300 rounded-full dark:bg-gray-920 w-24 mb-2.5"></div>
                <div className="w-32 h-2 bg-slate-200 rounded-full dark:bg-gray-930"></div>
            </div>
            <div className="h-2.5 bg-slate-300 rounded-full dark:bg-gray-930 w-12"></div>
        </div>
        <div className="flex items-center justify-between pt-4">
            <div>
                <div className="h-2.5 bg-slate-300 rounded-full dark:bg-gray-920 w-24 mb-2.5"></div>
                <div className="w-32 h-2 bg-slate-200 rounded-full dark:bg-gray-930"></div>
            </div>
            <div className="h-2.5 bg-slate-300 rounded-full dark:bg-gray-930 w-12"></div>
        </div>
        <div className="flex items-center justify-between pt-4">
            <div>
                <div className="h-2.5 bg-slate-300 rounded-full dark:bg-gray-920 w-24 mb-2.5"></div>
                <div className="w-32 h-2 bg-slate-200 rounded-full dark:bg-gray-930"></div>
            </div>
            <div className="h-2.5 bg-slate-300 rounded-full dark:bg-gray-930 w-12"></div>
        </div>
        <div className="flex items-center justify-between pt-4">
            <div>
                <div className="h-2.5 bg-slate-300 rounded-full dark:bg-gray-920 w-24 mb-2.5"></div>
                <div className="w-32 h-2 bg-slate-200 rounded-full dark:bg-gray-930"></div>
            </div>
            <div className="h-2.5 bg-slate-300 rounded-full dark:bg-gray-930 w-12"></div>
        </div>
        <span className="sr-only">Loading...</span>
    </div>

  )
}