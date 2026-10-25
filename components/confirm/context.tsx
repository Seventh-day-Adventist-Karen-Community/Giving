'use client'

import React,{useCallback} from 'react'
import { FcInfo } from 'react-icons/fc'
import {IoMdClose} from 'react-icons/io'
import useOnClickOutside from '../utils/select/hooks/use-onclick-outside'

interface props {
    children: React.ReactNode
}

export interface ConfirmType {

}
export type ConfirmContextType = {
    confirmMessage: React.ReactNode,
    confirmTitle: React.ReactNode,
    setConfirmMessage: (message:React.ReactNode, title?: React.ReactNode, confirmCallback?: Function, RejectCallback?: Function) => void,
}


export const ConfirmContext = React.createContext<ConfirmContextType | null>(null)

const ConfirmProvider = ({children}: props) => {
    const [message, setMessage] = React.useState<React.ReactNode>('Do You Wish To Continue?')
    const [title, setTitle] = React.useState<React.ReactNode>()
    const [show, setShow] = React.useState(false)
    const ref = React.useRef<HTMLDivElement>(null)
    const [confirmCallback, setConfirmCallback] = React.useState<Function | undefined>();
    const [rejectCallback, setRejectCallback] = React.useState<Function | undefined>();

    const setConfirmMessage = (message:React.ReactNode, title?: React.ReactNode, confirmCallback?: Function, RejectCallback?: Function) =>{
        setShow(true)
        setMessage(message)
        setTitle(title)
        confirmCallback && setConfirmCallback(() => confirmCallback);
        rejectCallback && setRejectCallback(() => rejectCallback);
    }

    const ConfirmDialog= () =>{
        setShow(false)
        confirmCallback && confirmCallback();
    }

    const RejectDialog = () =>{
        setShow(false)
        rejectCallback && rejectCallback();
    }
    useOnClickOutside(ref, ()=>{
        RejectDialog()
    })
    return (
        <ConfirmContext.Provider value={{confirmMessage: message, confirmTitle: title, setConfirmMessage}}>
            {show &&
                <div className='fixed top-0 left-0 w-full h-full flex flex-row justify-center items-center content-center backdrop-blur-sm dark:backdrop-blur-sm bg-gray-900 dark:bg-gray-50 bg-opacity-40 dark:bg-opacity-40 px-2 transition-all delay-100' style={{zIndex:9999}}>
                    <div className='fixed w-full sm:w-96 h-52 bg-slate-100 dark:bg-gray-900 dark:text-gray-300 rounded shadow-md px-4 transition-all delay-150' ref={ref}>
                        <div className='relative h-full'>
                            <div className='py-2'>
                                <div className='flex flex-row justify-start gap-2 py-2 content-center items-center'>
                                    {title && (title !== '') ? title:
                                    <>
                                        <FcInfo size={40} />
                                        <div className='text-lg font-bold'>Confirmation</div>
                                    </>
                                    }
                                </div>
                                <hr className='border border-gray-200 dark:border-gray-800 mb-2'/>                                
                                {message}
                            </div>
                            <div className='absolute left-0 bottom-0 py-1 w-full flex flex-row justify-between'>
                                <button onClick={RejectDialog} className='text-red-400 py-2 px-5 rounded-md hover:text-red-800 transition-all font-bold shadow-md hover:bg-red-300 dark:hover:bg-red-300 focus:ring-2 focus:ring-red-300 delay-75'>NO</button>
                                <button onClick={ConfirmDialog} className='text-green-700 py-2 px-5 rounded-md hover:text-green-800 transition-all font-bold shadow-md hover:bg-green-300 dark:hover:bg-green-300 focus:ring-2 focus:ring-green-300 delay-75'>YES</button>
                            </div>
                            <div className = 'absolute right-0 top-0 py-2' onClick={RejectDialog}>
                                <IoMdClose size={25} className="text-gray-400 dark:text-gray-600 hover:text-red-700 transition-all delay-75"/>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {children}
        </ConfirmContext.Provider>
    )
}

export default ConfirmProvider