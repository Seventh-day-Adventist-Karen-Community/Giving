import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface CardStackedProps {
    subtitle?: string,
    title: string,
    excerpt: string,
    image: string,
    imageWidth?: number | `${number}`,
    imageHeight?: number | `${number}`,
    className?:string,
    dark?: boolean,
    links?:{
        title:string,
        link:string,
        icon?: React.ReactNode,
        visible?: boolean | true
    }[]
}

const CardStack = (stack: CardStackedProps) => {
    let width = stack.imageWidth || 300;
    let height = stack.imageHeight || 200;
  return (
        <div className={`rounded overflow-hidden max-w-sm bg-white ${stack.className} shadow-xl rounded-xl cursor-pointer ${stack.dark ? 'dark:bg-gray-900 dark:hover:bg-gray-800 dark:text-gray-200 delay-100':'hover:-translate-y-5 transition-all delay-100'}`}>
            <div className='flex w-full justify-center align-middle'>
                {stack.image ?
                <Image width={width} height={height} className="w-full object-cover self-center" style={{width:stack.imageWidth, height:180 }} src={stack.image} alt={stack.title} loading='lazy' quality={100}/>
                :
                <div className='h-52 w-80 dark:bg-gray-700'>
                </div>
                }
            </div>
            <div className={`py-6 px-6 text-center md:text-left h-full ${stack.dark && ' '}`}>
                <div className="font-bold text-2xl">{stack.title}</div>
                <div className={`font-bold text-xl mb-2 text-gray-600 ${stack.dark && 'dark:text-gray-300'}`}>{stack.subtitle}</div>
                <p className={`text-gray-700 text-center text-base md:text-justify ${stack.dark && 'dark:text-gray-400'}`}  dangerouslySetInnerHTML={{__html:stack.excerpt}}>
                    {/* {stack.excerpt} */}
                </p>
                {stack.links && stack.dark &&
                    <div className={`flex flex-row justify-between gap-x-2 gap-y-2 ${stack.dark ?'mt-2':'my-2'}`}>
                        {stack.links.filter(({visible})=> visible===true).map(link =>{
                            return(
                                <Link className={`text-gray-200 hover:text-maroon-300 leading-tight transition-all flex justify-between gap-x-2 ${stack.dark && 'dark:bg-gray-700 dark:hover:bg-gray-600 px-4 dark:rounded dark:hover:text-gray-200 py-2'}`} key={link.link} href={link.link}>
                                   <div className='h-full flex flex-col justify-center'>                                    
                                    {link.icon}
                                   </div>
                                    {link.title}
                                </Link>
                                )
                            })}
                    </div>                    
                    }
            </div>
        </div>
  )
}

export default CardStack