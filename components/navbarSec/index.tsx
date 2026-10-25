'use client'

import Link from 'next/link'
import React, { useId } from 'react'
import { usePathname, useRouter } from 'next/navigation';
interface linkType{
    name: string,
    path: string
}

export interface navbarType {
    title: string,
    color?: string,
    links?: linkType[]
}

const NavbarSec = (navbar:navbarType) => {
    const pathname = usePathname();
    let path = pathname?.split('/').slice(-1)[0]??''
    const router = useRouter();
  return (
    <div className=' bg-maroon-50 border-t-2 border-t-maroon-600 w-full'>
        <div className='w-full flex justify-between mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 align-middle text-gray-900 '>
            <div className='py-3'>
                <h2 className='text-2xl font-bold'>{navbar.title}</h2>
            </div>
            <nav className='sm:flex justify-end hidden'>
                {
                    navbar.links &&
                    navbar.links.map((link) => {
                        let newpath = link.path.split('/').slice(-1)[0]??''
                        let isActive = path === newpath
                        return(
                            <Link key={link.path} 
                                className={`px-4 py-4 active:border-b-2 hover:border-b-2 hover:border-gray-400 hover:text-gray-400 ${isActive?'border-b-2 border-gray-900':''} transition-all`} 
                                href={link.path}>
                                    {link.name}
                            </Link>
                        )
                    })
                }               
            </nav>
            <select className='justify-end sm:hidden bg-inherit px-4 py-4 bg-none border-none rounded-md active:border-none' onChange={(e) => router.push(e.target.value)}>
                {
                    navbar.links &&
                    navbar.links.map((link) => {
                        let newpath = link.path.split('/').slice(-1)[0]??''
                        let isActive = path === newpath
                        return(
                            <option key={link.path} className='py-2 bg-inherit border-none' value={link.path} title={link.name} selected={isActive}>{link.name}</option>                            
                        )
                    })
                }               
            </select>
        </div>
    </div>
  )
}

export default NavbarSec