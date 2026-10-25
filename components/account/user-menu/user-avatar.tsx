import Image from 'next/image'
import React from 'react'
import { BiUserCircle } from 'react-icons/bi'
import { MeSetupType } from '../../../types/me'
import { NormifyURL } from '../../../utils/normify-url'

const UserAvatar = ({setup, username, width, height}:{setup?:MeSetupType, username?:string, width:number, height: number}) => {
  return (
    <>
        {setup?.avatar ?
        <Image src={NormifyURL(setup.avatar)} alt={username??''} width={width} height={height} className='rounded-full bg-slate-50' />
        :
        <BiUserCircle size={width} />
        }
    </>
  )
}

export default UserAvatar