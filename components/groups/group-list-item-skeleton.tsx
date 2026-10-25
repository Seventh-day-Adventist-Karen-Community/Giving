import React from 'react'
import { FaAngleRight, } from 'react-icons/fa'
import { TextButton } from '../buttons'
import {VscDebugBreakpointLog} from 'react-icons/vsc'
import {BsPatchCheck} from 'react-icons/bs'
import { GroupType } from '../../types/groupType'


const GroupListItemSkeleton = () => {
  return (
    <div className='w-96 h-52 shadow-lg rounded-md flex flex-row overflow-hidden cursor-pointer'>
        <div className='w-24 h-full animate-pulse'>
            <div className='h-27 w-full relative text-gray-100'>
                <div className={`h-22 bg-gray-200 w-full flex flex-col justify-center z-10 absolute left-0 top-0 mx-auto px-3`}>
                    <div className='text-center font-semibold text-md w-18 h-2 bg-slate-400 rounded-md my-auto'></div>
                    <div className='text-center text-2xs w-12 h-2 bg-slate-400 rounded-md my-auto'></div>
                    <div className='text-center text-2xs w-12 h-2 bg-slate-400 rounded-md my-auto'></div>
                </div>
                <div className='m-0 p-0 text-center w-full mx-auto flex flex-row justify-center absolute left-0 bottom-0'>
                    <VscDebugBreakpointLog size={50} className={`m-0 text-gray-200 rotate-180 p-0`}/>
                </div>
            </div>
            <div className='w-full flex flex-col justify-center gap-y-2 px-3'>
                <div className={`text-center font-semibold bg-slate-400 leading-4 text-md w-18 rounded-md h-2`}></div>
                <div className=' text-center text-2xs bg-slate-400 w-12 rounded-md h-2'></div>
                <div className='w-full text-center text-2xs flex flex-row justify-center gap-x-1 items-center text-gray-500 rounded-md'>
                    <BsPatchCheck className={`text-gray-700`}/> <div className='my-auto h-2 w-10 bg-slate-400 rounded-md'></div>
                </div>
            </div>
        </div>
        <div className='bg-white h-full w-4/5 flex flex-col relative animate-pulse'>
            <div className='px-4 flex flex-col gap-y-1 w-full'>
                <h3 className='text-lg font-bold mt-3 w-20 h-4 rounded-md'></h3>
                <h4 className='text-md bg-slate-400 w-14 h-2 rounded-md'></h4>
                <div className='pt-4 text-sm  text-left relative leading-6 w-full h-20 bg-slate-400'>
                        
                        <div className=' bg-gradient-to-b from-transparent to-white absolute left-0 top-0 w-full h-full'>
                        </div>
                </div>
            </div>
            <div className='absolute h-10 bottom-0 left-0 z-10 px-4 text-center flex flex-col justify-center bg-inherit w-full drop-shadow-2xl shadow-slate-50'>
                <div className='bg-slate-400 w-full rounded-md h-2'></div>
            </div>
        </div>
    </div>
  )
}

export default GroupListItemSkeleton