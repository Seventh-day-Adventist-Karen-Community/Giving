'use client'

import { FormatCarriages } from '@utils/formatCarriages'
import React, {useState} from 'react'
import {BiChevronDown, BiChevronUp} from 'react-icons/bi'

const Toggler = ({title, children, className}:{title:React.ReactNode|string,children:React.ReactNode, className?:string}) => {
const [toggle, setToggle] = useState(false)
  return (
    <div>
        <div className={`transition-all duration-700 cursor-pointer rounded-md ${className}`}>
            <div className={`py-2 flex flex-wrap justify-between transition-all`}  onClick={() => setToggle(!toggle)}>
                <div className="flex-1 transition-all">
                   {title}
                </div>
                <div className={`w-auto transition-all duration-700 px-2 bg-transparent ${toggle ?'text-maroon-600 transition-all duration-700':' '}`}>
                    {toggle?
                        <BiChevronUp size={25}/>                    
                        :
                        <BiChevronDown size={25}/>                    
                    }
                </div>
            </div>
            <div className='transition-all duration-700'>
                {toggle && children}
            </div>
        </div>
    </div>
  )
}

export default Toggler
