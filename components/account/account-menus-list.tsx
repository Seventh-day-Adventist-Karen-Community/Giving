import Link from 'next/link'
import React from 'react'
import { BsActivity } from 'react-icons/bs'
import { FcDepartment } from 'react-icons/fc'
import { HiOutlineUserGroup } from 'react-icons/hi'
import { GiTakeMyMoney } from 'react-icons/gi'
import { MdOutlineManageAccounts, MdOutlineDashboardCustomize } from 'react-icons/md'
import { BiAnalyse } from 'react-icons/bi'
import ProtectedAccountMenuList from './protected-account-menu'

const AccountMenuList = () => {
    let iconClassName = 'text-maroon-400  dark:text-maroon-400  group-hover:text-slate-900 dark:group-hover:text-white'
    let linkClassName = 'flex items-center p-2 text-slate-900 rounded-lg dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 focus:bg-slate-100 dark:focus:bg-slate-800'
  return (
    <>
       <li>
          <Link href="/account" className={linkClassName}>
          <MdOutlineDashboardCustomize size={20} className={iconClassName} />
          <span className="ml-3">Dashboard</span>
          </Link>
      </li>
      <li>
          <Link href="/account/me" className={linkClassName}>
          <MdOutlineManageAccounts size={20} className={iconClassName}  />
          <span className="flex-1 ml-3 whitespace-nowrap">Profile</span>
          </Link>
      </li>
      <li>
          <a href="/account/finance" className={linkClassName}>
          <GiTakeMyMoney size={20} className={iconClassName} />
          <span className="flex-1 ml-3 whitespace-nowrap">Finance</span>
          {/* <span className="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">3</span> */}
          </a>
      </li>
      <li>
          <a href="/account/departments" className={linkClassName}>
          <FcDepartment size={20} className={iconClassName}  />
          <span className="flex-1 ml-3 whitespace-nowrap">Departments</span>
          </a>
      </li>
      <li>
          <Link href="/account/groups" className={linkClassName}>
          <HiOutlineUserGroup size={20} className={iconClassName}  />
          <span className="flex-1 ml-3 whitespace-nowrap">Groups</span>
          </Link>
      </li>
      <li>
          <Link href="/account/activities" className={linkClassName}>
          <BsActivity size={20} className={iconClassName}   />
          <span className="flex-1 ml-3 whitespace-nowrap">Activities</span>
          </Link>
      </li>
      <ProtectedAccountMenuList linkClassName={linkClassName} iconClassName={iconClassName}/>
    </>
  )
}

export default AccountMenuList