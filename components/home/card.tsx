'use client'
import Link from 'next/link'
import React,{useEffect, useState} from 'react'
import { AnimationOnScroll } from 'react-animation-on-scroll'

interface details {
  title?: string,
  description: string,
  sub?: string,
  image?: string,
  delay?:number,
  link: string
}

const Card = (details:details) => {
  let [smallScreenSize, setSmallScreenSize] = useState<boolean>(true);
  useEffect(() => {
  setSmallScreenSize(window.innerHeight > 600)
  console.log(window.innerWidth > 600)
  return () => {
      setSmallScreenSize(true)
  }
  }, [smallScreenSize])
  return (
    <Link href={details.link} className='rounded-lg'>      
    <AnimationOnScroll initiallyVisible={smallScreenSize} offset={10}  animateIn="animate__bounceInDown" animateOnce delay={details.delay} className="max-w-sm w-full mx-auto lg:max-w-full lg:flex rounded-lg shadow-md bg-gray-50 hover:bg-gray-200 cursor-pointer self-center lg:self-auto transition-all">
        <div className="h-38 max-h-38 lg:max-h-30 lg:h-30 lg:w-28 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" 
          style={{backgroundImage: `url(${details.image})`}} title={details.title}>
        </div>
        <div className="border-r bg-transparent rounded-lg lg:rounded-l-none rounded-r-lg p-4 flex flex-col justify-between leading-normal">
          <div>
              <p className="text-sm text-gray-600 flex items-center">
              <svg className="fill-current text-gray-500 w-3 h-3 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
              </svg>
              {details.sub}
              </p>
              <div className="text-gray-900 font-bold text-xl mb-2 ">{details.title}</div>
              <div className='lg:max-h-20 overflow-y-hidden w-full lg:w-64'>
                <p className="text-gray-700 text-base ">{details.description}</p>
              </div>
          </div>
        {/* <div className="flex items-center">
            <img className="w-10 h-10 rounded-full mr-4" src="/sample.png" alt="Avatar of Jonathan Reinink" />
            <div className="text-sm">
            <p className="text-gray-900 leading-none">Jonathan Reinink</p>
            <p className="text-gray-600">Aug 18</p>
            </div>
        </div> */}
        </div>
    </AnimationOnScroll>
    
    </Link>
  )
}

export default Card