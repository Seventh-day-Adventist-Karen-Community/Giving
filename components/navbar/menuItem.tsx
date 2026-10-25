import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const MenuItem = ({title, link,main, description}:{title?:string, link: string, main?: boolean, description?:string}) =>{
    let newLink = link.split('/').slice(-1)[0]??''
    let currPath = usePathname()
    let active = currPath?.includes(newLink);
    return(
        <Link href={link} 
            className={`$ hover:text-maroon-500 px-3 text-sm font-medium
                ${active? 'text-maroon-600':'text-gray-700 '}
                ${main ? 'pt-2 h-9 ':`text-maroon-600 hover:bg-maroon-50 py-3 ${active && ' bg-maroon-50 cursor-not-allowed '}`}
                flex flex-col justify-left md:flex-row md:justify-start text-left border-b-1 md:border-none transition-all`}>
            <div className={`${main?'':'md:w-60 text-maroon-600'}`}>{title}</div> 
            {!main &&
            <div className='text-gray-600'>{description}</div>
}
        </Link>
        )
}

export default MenuItem