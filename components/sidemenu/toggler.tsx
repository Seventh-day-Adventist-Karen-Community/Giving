'use client'

import { TogglerElementType } from '@customTypes/utilTypes'
import Link from 'next/link'
import React, {useState} from 'react'
import {BiChevronRight, BiChevronUp} from 'react-icons/bi'


const TogglerElement = ({title, content, id, active}:TogglerElementType) => {
const [toggle, setToggle] = useState(active)
  return (
    <div>
        <div key={id} className="transition-all cursor-pointer rounded-md relative truncate">
            { typeof(content)=='string' ?
                <Link href={content} className={`text-base leading-normal hover:text-maroon-700 truncate ${active && 'text-maroon-500'}`} title={title}>{title}</Link>
                :
                <>
                <div className={`text-base leading-normal hover:text-maroon-700 truncate `} title={title} onClick={() => setToggle(!toggle)}>{title}</div>
                    {toggle &&
                    content.map(cont =>{
                        return (
                        <div  key={cont.id} className='pl-2'>
                                <TogglerElement {...cont} />
                        </div>
                        )
                        })
                    }
                </>
            }
            { typeof(content)!='string' &&
            <div className={`absolute top-0 right-0 py-1 px-2 w-auto bg-transparent`}  onClick={() => setToggle(!toggle)}>
                {toggle?
                    <BiChevronUp size={20}/>                    
                    :
                    <BiChevronRight size={20}/>                    
                }
            </div>
            }
        </div>
    </div>
  )
}

export default TogglerElement