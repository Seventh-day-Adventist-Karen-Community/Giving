import Image from 'next/image'
import React from 'react'
import { PrimaryButton } from "./buttons";

interface CardProps {
    subtitle?: string,
    title: string,
    excerpt: string,
    image: string,
    imageWidth?: number | `${number}`,
    className?:string,
    reverse?:boolean,
    textPaddingLarge?:boolean,
    noShadow?: boolean,
    links?:{
        title:string,
        link:string
    }[]
}

const Card = (leader: CardProps) => {
    let width = leader.imageWidth || 400;
  return (
        <div className={`rounded overflow-hidden ${leader.className} md:flex ${leader.reverse?'md:flex-row-reverse':'md:flex-row'} justify-center w-full md:my-6`}>
            <div className='flex w-full md:w-1/2 justify-center align-middle bg-transparent rounded-md md:rounded-xl'>
                <Image width={width} height={width} className={`w-full rounded-md md:rounded-xl self-center ${leader.noShadow?'':'shadow-lg'} `} style={{width:leader.imageWidth}} src={leader.image} alt={leader.title} loading='lazy' quality={75}/>
            </div>
            <div className={` py-6 md:my-auto ${leader.reverse?'md:pr-5':'md:pl-5'} md:w-1/2 text-center md:text-left flex flex-col md:justify-center h-full md:align-middle `}>
                <div className='flex flex-col gap-y-2'>
                {leader.title &&
                <div className={`${leader.textPaddingLarge?'px-12':''} font-bold text-3xl`}>{leader.title}</div>
                }
                {leader.subtitle &&
                    <div className={`${leader.textPaddingLarge?'px-12':''} font-bold text-xl mb-2 text-gray-600`}>{leader.subtitle}</div>
                }
                {leader.excerpt && 
                    <p className={`${leader.textPaddingLarge?'px-12':''} text-gray-700 text-base text-justify`} dangerouslySetInnerHTML = {{__html:leader.excerpt}}>
                        {/* {leader.excerpt} */}
                    </p>
                }
                {leader.links && 
                    <div className={`${leader.textPaddingLarge?'px-12':''} flex flex-col gap-y-2 my-2`}>
                        {leader.links.map(link =>{
                            return(
                                <a className='text-blue-500 hover:text-maroon-300 leading-tight transition-all' key={link.link} href={link.link}>{link.title}</a>
                                )
                            })}
                    </div>
                    }
                </div>
            </div>
        </div>
  )
}

export default Card

