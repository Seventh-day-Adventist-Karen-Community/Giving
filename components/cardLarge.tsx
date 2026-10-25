import Image from 'next/image'
import React from 'react'

export interface CardLeadersProps {
    no?:string,
    name?: string,
    title: string,
    excerpt: string,
    image: string,
    imageWidth?: number | `${number}`,
    maxImageHeight?: number | `${number}`,
    className?:string,
    links?:{
        title:string,
        link:string
    }[]
}

const CardLeaders = (leader: CardLeadersProps) => {
    let width = leader.imageWidth || 400;
  return (
        <div className={`rounded overflow-hidden max-w-xl ${leader.className}`}>
            <div className='flex w-full justify-center align-middle'>
                {
                    leader.image && leader.image !== '' ?
                        <Image width={width} height={width} className="w-full rounded-md self-center object-scale-down" style={{maxHeight:leader.maxImageHeight}} src={leader.image} alt={leader.title} loading='lazy' quality={75}/>
                    :''
                }
            </div>
            <div className="py-6 text-center md:text-left">
                <div className="font-bold text-2xl">{leader.name}</div>
                <div className="font-bold text-xl mb-2 text-gray-600">{leader.title}</div>
                <p className="text-gray-700 text-base text-justify" dangerouslySetInnerHTML={{__html:leader.excerpt}}>
                    {/* {leader.excerpt} */}
                </p>
            </div>
        </div>
  )
}

export default CardLeaders


export const ContentContainer = (leader: CardLeadersProps) => {
    let width = leader.imageWidth || 400;
  return (
        <div className={`rounded overflow-hidden max-w-2xl ${leader.className}`}>
            <div className='flex w-full justify-center align-middle'>
                {
                    leader.image && leader.image !== '' ?
                        <Image width={1000} height={600} className="w-full rounded-md self-center object-cover" style={{maxHeight:leader.maxImageHeight}} src={leader.image} alt={leader.title} loading='lazy' quality={75}/>
                    :''
                }
            </div>
            <div className="py-6 text-center md:text-left">
                <div className="font-bold text-2xl">{leader.name}</div>
                <div className="font-bold text-xl mb-2 text-gray-600">{leader.title}</div>
                <p className="text-gray-700 text-lg text-start" dangerouslySetInnerHTML={{__html:leader.excerpt}}>
                </p>
            </div>
        </div>
  )
}