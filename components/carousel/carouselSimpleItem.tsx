import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const CarouselSimpleItem = ({image, href}:{image:string, href:string}) => {
  return (
        <Link href={href} className='cursor-pointer flex-nowrap flex-grow-0 flex-shrink-0'>
            <Image src={image} className='w-44 min-w-44 h-44 rounded-xl shadow-md flex-grow-0 flex-shrink-0 cursor-pointer' width={200} height={200} alt={href}/>
        </Link>
  )
}

export default CarouselSimpleItem