'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useCallback, useContext} from 'react'
import {CgMenuGridO, CgCloseO} from 'react-icons/cg'
import { MenuContext } from '../../context/menu'
import { StatusContextType } from '../../context/types'
import AccountsMenu from './accountMenu'
import MainMenu from './mainMenu'
import NavbarMenu from './navbarMenu'
const Navbar = () => {
const menu = useContext(MenuContext) as StatusContextType
    const toggleMenu = useCallback(
    () => {
        menu?.toggle();
    },
    [menu],
    )
  return (
    <header className='fixed top-0 left-0 w-full z-50'>
        <nav className="shadow-md relative">
            <div className='bg-white '>                
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                
                <div className="flex flex-1">
                    <Link className="flex" href='/'>
                        <Image className="h-8 w-auto" src="/logo.png" alt="" width={100} height={100}/>
                    </Link>
                    <div className="hidden sm:ml-6 md:block">
                        <div className="flex space-x-4">
                            {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
                            <NavbarMenu main={true} />
                        </div>
                    </div>
                </div>
                <div className='flex justify-end gap-x-3'>
                    <AccountsMenu />
                    <div className="inset-y-0 flex items-center" onClick={() => toggleMenu()}>
                        {/* <!-- Mobile menu button--> */}
                        <button type="button" className="inline-flex items-center justify-center rounded-md p-2 text-gray-800 hover:bg-gray-300 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-all" aria-controls="mobile-menu" aria-expanded="false">
                            { 
                            menu?.status? 
                            <CgCloseO size={30} color='#ff3400' />
                            :
                            <CgMenuGridO size={30}/>
                            } 
                        </button>
                    </div>
                </div>
                </div>
            </div>
        </div>

        {/* <!-- Mobile menu, show/hide based on menu state. --> */}
        {menu?.status && 
            <div className="absolute z-50 left-0 bg-white opacity-95 w-full overflow-y-auto max-h-screen" id="mobile-menu">
                <div className="space-y-1 px-2 pt-2 sm:px-8 md:px-24 lg:px-40 pb-12">
                    <MainMenu />
                </div>
            </div>
        }
        </nav>

    </header>
  )
}

export default Navbar