import React from 'react'
import { AiOutlineDelete } from 'react-icons/ai'
import { CgClose } from 'react-icons/cg'
import { FaSync, FaUpload } from 'react-icons/fa'

const Uploader = ({title, children, onUpload, onClear, onReset, onClose}:{title: string,children?: React.ReactNode, onUpload:Function,  onClear:Function, onReset:Function, onClose:Function}) => {
  return (
    <div className='absolute top-1/2 left-1/2 bg-gray-50 w-1/3 min-h-36 z-30 -translate-x-1/2 -translate-y-1/2 opacity-95 rounded-lg shadow-lg py-2 transition-all'>
        <div className='relative'>
            <div className='font-semibold z-0 flex flex-nowrap gap-x-3 justify-start transition-all text-center text-sm my-auto py-3 px-3 mx-2 border-b-2 text-blue-700'>
                {title}
            </div>
            <div className='hover:text-blue-700 hover:bg-blue-100 font-semibold z-0 flex flex-nowrap gap-x-3 justify-start transition-all text-center cursor-pointer text-sm my-auto py-3 px-5 rounded-md'
            onClick={() => {
                onUpload()
            }}>
                <FaUpload size={15}/>
                Upload
            </div>
            <div className='hover:text-blue-700 hover:bg-blue-100 font-semibold z-0 flex flex-nowrap gap-x-3 justify-start transition-all text-center cursor-pointer text-sm my-auto py-3 px-5 rounded-md'
            onClick={() => {
                onClear()
            }}>
                <AiOutlineDelete size={15}/>
                Clear
            </div>
            <div className='hover:text-blue-700 hover:bg-blue-100 font-semibold z-0 flex flex-nowrap gap-x-3 justify-start transition-all text-center cursor-pointer text-sm my-auto py-3 px-5 rounded-md'
            onClick={() => {
                onReset()
            }}>
                <FaSync size={15} />
                Reset
            </div>
            {children}
            <div className='absolute right-0 top-0 px-4 text-red-600 py-2 hover:cursor-pointer hover:text-inherit' 
            onClick={() => {
                onClose()
            }}>
                <CgClose size={20} />
            </div>
        </div>
    </div>
  )
}

export default Uploader