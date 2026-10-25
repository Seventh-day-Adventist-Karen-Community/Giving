'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useCallback, useContext, useState, useRef} from 'react'
import { BiLogIn, BiUserCircle } from 'react-icons/bi'
import { BsFillPersonFill } from 'react-icons/bs'
import { RiSettings5Line } from 'react-icons/ri'
import Dropdown from '../dropdown'
import useOnClickOutside from '../utils/select/hooks/use-onclick-outside'

const AccountsMenu = () => {
const [open, setOpen] = useState(false)
const ref = useRef<HTMLDivElement>(null);

const toggleDropdown = useCallback(
    () => {
        setOpen(!open)
    },
    [open],
)

const closeDropDown = useCallback(() => {
    if (open) setOpen(false);
}, [open]);

useOnClickOutside(ref, () => {
    closeDropDown();
});

  return (
    <div className="flex items-center sm:static sm:inset-auto">
       
        {/* <!-- Profile dropdown --> */}
        <div className="relative ml-3" onClick = {() => toggleDropdown()} ref={ref}>
            <div>
                <button type="button" className="flex rounded-full bg-gray-800 text-gray-50 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 hover:bg-slate-500" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                <span className="sr-only">Open user menu</span>
                    <BiUserCircle size={25} />

                {/* <Image className="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" width={30} height={30}/> */}
                </button>
            </div>

            {open && <Dropdown>
                <Link href="/account/me" className="px-4 py-2 text-sm text-gray-700 hover:bg-maroon-50 transition-all flex gap-3" role="menuitem" tabIndex={-1} id="user-menu-item-0">
                   <BsFillPersonFill size={20}/>
                    Your Profile
                </Link>
                <Link href="/account" className="px-4 py-2 text-sm text-gray-700 hover:bg-maroon-50 transition-all flex gap-3" role="menuitem" tabIndex={-1} id="user-menu-item-1">
                    <RiSettings5Line size={20} />
                    Settings
                </Link>
                <Link href="/auth/login" className="px-4 py-2 text-sm text-gray-700 hover:bg-maroon-50 transition-all flex gap-3" role="menuitem" tabIndex={-1} id="user-menu-item-2">
                    <BiLogIn size={20} />
                    Sign In
                </Link>
            </Dropdown>
            }
        </div>
    </div>
  )
}

export default AccountsMenu