'use client'

import React from 'react'
import { ImSpinner6 } from 'react-icons/im'

export type FormUtilType = {
  errors?:string, 
  loading:boolean,
  success?:boolean,
  info?:string, 
  successMessage?:string,
  dark?: boolean
}

const FormUtils = ({errors, loading,success,info, successMessage, dark}:FormUtilType) => {
    const [showError, setshowError] = React.useState<boolean>(true)
    const [showSuccess, setshowSuccess] = React.useState<boolean>(true)
    const [showInfo, setshowInfo] = React.useState<boolean>(true)
    React.useEffect(() => {
      if (errors){
        setshowError(true)
      }
      if(success){
        setshowSuccess(true)
      }
      if(info){
        setshowInfo(true)
      }
    
      return () => {
        setshowError(false)
        setshowSuccess(false)
        setshowInfo(false)
      }
    }, [errors, success,info])
    
  return (
    <>
        {errors && showError &&
            <div className={`bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative transition-all ${dark && "dark:bg-slate-700 dark:text-red-500"} overflow-x-clip` }  role="alert">
                <strong className="font-bold pr-1">Error!</strong>
                <span className="block sm:inline w-full">{errors}</span>
                <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                <svg onClick={()=>setshowError(false)} className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                </span>
            </div>
        }
        {loading &&
            <div className={`flex flex-col text-center align-middle justify-center py-32 absolute h-full w-full left-0 top-0 bg-slate-50  opacity-70 transition-all z-40 ${dark && 'dark:bg-gray-900'}`}>
                <div className='flex flex-row justify-center w-full'>
                  <ImSpinner6 className='animate-spin' size={25}/>
                </div>
            </div>
        }
        {info && showInfo &&
            // <div className="flex items-center bg-blue-500 text-white text-sm font-bold px-4 py-3 rounded" role="alert">
            //     <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"/></svg>
            //     <p>{info}</p>
            // </div>
            <div className={`bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative transition-all ${dark && "dark:bg-slate-700 dark:text-blue-500"}`} role="alert">
                <strong className="font-bold pr-1">Info!</strong>
                <span className="block sm:inline">{info}</span>
                <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                <svg onClick={()=>setshowInfo(false)} className="fill-current h-6 w-6 text-blue-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                </span>
         </div>
        }
        {success && showSuccess && 
             <div className={`bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative transition-all ${dark && "dark:bg-slate-700 dark:text-green-500"}`} role="alert">
                <strong className="font-bold pr-1">Success!</strong>
                <span className="block sm:inline">{successMessage ? successMessage: 'Action Completed Successfully'}</span>
                <span className="absolute top-0 bottom-0 right-0 px-2 py-3">
                  <svg onClick={()=>setshowSuccess(false)} className="fill-current h-6 w-6 text-green-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                </span>
            </div>
        }
    </>
  )
}

export default FormUtils