'use client'

import React, { useRef, useState } from 'react'
import CarouselSimpleItem from './carouselSimpleItem'

export interface ListItem{
    id?: number | string,
    link: string,
    image: string,
    width?: number
}

export interface CarouselList{
    listItem: ListItem[]
}

const Carousel = (carouselList: CarouselList) => {
    const [scrolled, setScrolled] = useState<number>(200)
    const scrollRef = useRef<HTMLDivElement>(null)
    const ScrollCarousel = (positive:boolean) =>{
        if (positive){
            scrolled < -700 ? setScrolled(200): setScrolled(scrolled + 200)
        } else{
            scrolled > 700 ? setScrolled(-200) : setScrolled(scrolled - 200)
        }
        scrollRef.current?.scrollBy(scrolled, 0)
    }
  return (
    <div className={`relative py-5 transition-all w-full self-center`}>
            <div className='bg-slate-50 shadow-sm hover:bg-slate-100 hover:shadow-md transition-all p-2 rounded-full cursor-pointer h-10 w-10 self-center m-1 absolute left-0 flex flex-row justify-between' style={{top: '5.5rem'}} onClick={()=>ScrollCarousel(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
            </div>
            <div className='bg-slate-50 shadow-sm hover:bg-slate-100 hover:shadow-md transition-all p-2 rounded-full cursor-pointer h-10 w-10 self-center m-1 absolute right-0 flex flex-row justify-between' style={{top: '5.5rem'}} onClick={()=>ScrollCarousel(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
            </div>
        <div className='flex flex-row gap-6 scroll-smooth overflow-x-auto scrollbar transition-all' style={{scrollbarWidth:'none'}} ref={scrollRef}>
            {
                carouselList.listItem.map(listItem => {
                    return(
                        <CarouselSimpleItem key={listItem.id} href={listItem.link} image={listItem.image}/>
                    )
                })
            }
        </div>
    </div>
  )
}

export default Carousel