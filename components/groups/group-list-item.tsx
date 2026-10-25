import React from 'react'
import { FaAngleRight, } from 'react-icons/fa'
import { AdminTextLinkPlain, TextButton } from '../buttons'
import {VscDebugBreakpointLog} from 'react-icons/vsc'
import {BsEye, BsPatchCheck} from 'react-icons/bs'
import { GroupType } from '../../types/groupType'
import { BiEdit } from 'react-icons/bi'
import { CgUserList } from 'react-icons/cg'
import Link from 'next/link'


const GroupListItem = ({group, dark, admin}:{group: GroupType, dark?: boolean, admin?: boolean}) => {
  return (
    <Link href={admin?`/account/groups/${group.id}`:`/group/${group.id}`}>
        <div className={`w-96 h-52 shadow-lg rounded-md flex flex-row overflow-hidden cursor-pointer ${dark ? "dark:bg-gray-700 bg-gray-100":''}`}>
            <div className='w-24 h-full'>
                <div className='h-27 w-full relative text-gray-100'>
                    <div className={`h-22 bg-green-700 w-full flex flex-col justify-center z-10 absolute left-0 top-0 mx-auto p-2 overflow-x-clip`} style={{backgroundColor: group.color}}>
                        <div className='w-full text-center font-semibold text-md'>{group.days}</div>
                        <div className='w-full text-center text-2xs'>{group.time}</div>
                        <div className='w-full text-center text-2xs'>{group.routine}</div>
                    </div>
                    <div className='m-0 p-0 text-center w-full mx-auto flex flex-row justify-center absolute left-0 bottom-0'>
                        <VscDebugBreakpointLog size={50} className={`m-0 text-green-700 rotate-180 p-0`}  style={{color: group.color}}/>
                    </div>
                </div>
                <div className={`w-full flex flex-col justify-center gap-y-2 text-gray-500 ${dark?"dark:text-gray-300":""}`}>
                    <div className={`w-full text-center font-semibold text-green-700 leading-4 text-md`} style={{color: group.color}}>{group.category}</div>
                    <div className="w-full text-center text-2xs">{group.ageGroup}</div>
                    {group.kidsAllowed &&
                        <div className='w-full text-center text-2xs flex flex-row justify-center gap-x-1 items-center'>
                            <BsPatchCheck className={`text-green-700`}  style={{color: group.color}}/> <div className='my-auto'>Kids</div>
                        </div>
                    }
                </div>
            </div>
            <div className={`bg-white h-full w-4/5 flex flex-col relative  ${dark ? "dark:bg-slate-800":''}`}>
                <div className='px-4 flex flex-col gap-y-1'>
                    <h3 className='text-lg font-bold mt-3'>{group.title}</h3>
                    <h4 className='text-md text-gray-400'>{group.location}</h4>
                    <div className={`pt-4 text-sm text-gray-800 text-left relative leading-6  ${dark ? "dark:text-gray-200":''}`}>
                            {group.details}
                        <div className={`bg-gradient-to-b from-transparent to-white  ${dark ? "dark:to-slate-800":''} absolute left-0 top-0 w-full h-full`}>
                            </div>
                    </div>
                </div>
                {admin? 
                    <div className={`absolute bottom-0 left-0 flex flex-row justify-between w-full px-1 py-1  shadow-slate-50 bg-inherit dark:shadow-slate-900`}>
                        <AdminTextLinkPlain  link={`/account/groups/${group.id}`} title='View' text='View' icon={<BsEye/>} reverse/>
                        {
                            group.canModify &&
                            <AdminTextLinkPlain  link={`/account/groups/${group.id}/edit`} text='Edit' icon={<BiEdit />} reverse/>           
                        }
                        <AdminTextLinkPlain  link={`/account/groups/${group.id}/members`} title='Members' text='Members' icon={<CgUserList/>} reverse/>                
                    </div>
                :
                <div className={`absolute h-10 bottom-0 left-0 z-10 px-4 text-center flex flex-col justify-center bg-inherit w-full drop-shadow-2xl shadow-slate-50 ${dark ? "dark:shadow-slate-900":''}`}>
                    <TextButton link={`/group/${group.id}`} text='More Info' icon ={<FaAngleRight/>} />
                </div>
                }
            </div>
        </div>
    </Link>
  )
}

export default GroupListItem