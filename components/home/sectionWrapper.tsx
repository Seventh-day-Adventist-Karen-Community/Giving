'use client'

import React,{ useState } from 'react'
import { SectionContent } from '../../types/sectionContent'
import Section1Edit from './section1Edit'
import Section1 from './section1'
import { BiEdit } from 'react-icons/bi'
import { CgClose } from 'react-icons/cg'

const SectionWrapper = (content:SectionContent) => {
    const [Edit, setEdit] = useState<boolean>()
  return (
    <div className='relative'>
        {
            Edit ? <Section1Edit {...content}/>: <Section1 {...content} />
        }
        {/* <div className='absolute right-0 top-0 w-full mx-auto max-w-7xl px-2 sm:px-6 lg:px-14 flex justify-center md:justify-end' onClick={() => setEdit(!Edit)}>
            <div className='cursor-pointer py-2 bg-maroon-100 px-2 shadow-md rounded-sm hover:text-gray-700 transition-all hover:scale-105 flex flex-col justify-center align-middle text-center font-semibold px-auto hover:shadow-lg'>
                {Edit?<CgClose size={30}/>:<BiEdit size={30}/>}
            </div>
        </div> */}
    </div>
  )
}   

export default SectionWrapper