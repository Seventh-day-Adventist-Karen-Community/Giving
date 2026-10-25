'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const Breadcrumb = () => {
    const pathName = usePathname()
    let pathList = pathName?.split('/').filter((elem:string)=> elem !== '')
    let pathObjects1 = pathList?.map(currPath=>{
        return({
            name: currPath,
            path: currPath,
            current: false
        })
    })
    let pathObjects = pathList?.map(currPath=>{
        let index = pathList?.indexOf(currPath) || 0
        let prevPath = ''
        if(index != 0 && index != -1){
            prevPath = pathObjects1?.[index-1].path || ''
        }
        let newPath = prevPath + '/'+currPath
        if (pathObjects1 != undefined){
            pathObjects1[index] = {name: currPath, path: newPath, current: false}
        }
        return({
            id: index + Math.random(),
            name: currPath.split('-').join(' '),
            path: newPath,
            current: pathName === newPath
        })
    })
  return (
    <nav className="flex px-5 py-3 text-gray-700 rounded-lg bg-slate-50 dark:bg-gray-950 mb-2 overflow-x-hidden shadow-md w-full" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
            {
                pathObjects?.map(({id, path, name, current}:{id:any, path:string,name:string,current:boolean}) =>{
                    return (
                        <li key={id} className="inline-flex items-center">
                            <Link href={path} className={`inline-flex items-center text-sm font-medium text-gray-700 hover:text-maroon-600 dark:text-slate-400 dark:hover:text-white capitalize ${current && "text-slate-500 dark:text-gray-500 dark:hover:text-gray-500 hover:text-gray-700 cursor-not-allowed"}`}>
                                {(pathList?.indexOf(name) == 0) ?
                                    <>
                                        <svg aria-hidden="true" className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
                                        {name}
                                    </>
                                    :
                                    <p className='max-w-30 overflow-x-hidden text-ellipsis' title={name}>{name}</p>
                                }
                                {!current &&
                                    <svg aria-hidden="true" className="w-6 h-6 text-slate-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                                }
                            </Link>
                        </li>
                        )
                })
            }
        </ol>
    </nav>                
  )
}

export default Breadcrumb