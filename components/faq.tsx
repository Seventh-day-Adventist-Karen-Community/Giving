'use client'

import { FormatCarriages } from '@utils/formatCarriages'
import React, {useState} from 'react'
import {BiChevronDown, BiChevronUp} from 'react-icons/bi'

const Faq = ({title, description}:{title:string,description:string}) => {
const [toggle, setToggle] = useState(false)
  return (
    <div>
        <div className="bg-white shadow-10xl transition-all cursor-pointer border-b-1 rounded-md" onClick={() => setToggle(!toggle)}>
            <div className={`py-3 flex flex-wrap justify-between transition-all hover:bg-green-50 ${toggle?'bg-green-50':''}`}>
                <div className="flex-1 transition-all">
                    <h3 className="text-lg sm:text-xl leading-normal px-5">{title}</h3>
                </div>
                <div className={`w-auto px-2 bg-transparent ${toggle ?'text-maroon-600':' '}`}>
                    {toggle?
                        <BiChevronUp size={25}/>                    
                        :
                        <BiChevronDown size={25}/>                    
                    }
                </div>
            </div>
            <div>
                <p className={`text-gray-700 whitespace-pre-wrap bg-gray-100 py-3 sm:text-lg px-5 leading-8 ${toggle?'h-auto':'h-0 hidden'}`}>{description}</p>
            </div>
        </div>
    </div>
  )
}

export default Faq
