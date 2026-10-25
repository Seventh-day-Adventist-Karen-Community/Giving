import React from 'react'
import { LinkInput, TextButton } from './buttons'

interface props {
    icon?: React.ReactNode,
    title?: string,
    content: string,
    buttonInput: LinkInput
}

const IconCard = (props:props) => {
  return (    
        <div className="w-64 max-w-xs py-3 bg-white border border-gray-200 rounded-lg shadow-md flex justify-center flex-col align-middle">
            <div className='bg-maroon-800 text-gray-50 rounded-full flex justify-center w-10 h-10 shadow-lg align-middle mx-auto my-5'>
                <div className='h-full flex flex-col justify-center '>
                    {props.icon}
                </div>
            </div>
            <div className='px-7'>
                <h4>{props.title}</h4>
                <p className="mb-3 font-normal text-gray-600 dark:text-gray-400 text-lg text-center">
                    {props.content}
                </p>
            </div>
            <div className='mx-auto my-3 px-1'>
                <TextButton {...props.buttonInput} />
            </div>
        </div>

  )
}

export default IconCard