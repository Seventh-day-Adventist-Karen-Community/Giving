'use client'

import Link from 'next/link'
import React, { useId } from 'react'
import { usePathname, useRouter } from 'next/navigation';
import { navbarType } from './navbarSec';

const NavbarTertiary = (navbar:navbarType) => {
    const pathname = usePathname();
    let path = pathname?.split('/').slice(-1)[0]??''
    const router = useRouter();
  return (
    <div className=' w-full my-2 mt-4'>
        <div className='w-full flex justify-start mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 align-middle text-gray-900 '>
            <nav className='flex gap-x-4 justify-end'>
                {
                    navbar.links &&
                    navbar.links.map((link) => {
                        let newpath = link.path.split('/').slice(-1)[0]??''
                        let isActive = path === newpath
                        return(
                            <Link key={link.path} 
                                className={`py-1 active:border-b-2 ${isActive?'border-b-2 border-maroon-600 text-maroon-600 cursor-not-allowed ':'  hover:border-b-2 hover:border-gray-400 hover:text-gray-400 '} transition-all`} 
                                href={link.path}>
                                    {link.name}
                            </Link>
                        )
                    })
                }               
            </nav>
        </div>
    </div>
  )
}

export default NavbarTertiary