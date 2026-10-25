'use client'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import { SectionContent } from '../../types/sectionContent'
import { PrimaryButton, SecondaryButton } from '../buttons'
import Carousel from '../carousel'
import { AnimationOnScroll } from 'react-animation-on-scroll'
import dynamic from 'next/dynamic'
import { NormifyURL } from '../../utils/normify-url'

const CustomCountDown = dynamic(()=> import('../count-down/custom-count-down'), {
    ssr: false,
})
const Section1 = (content:SectionContent) => {
    let bgImage: string = `url(${NormifyURL(content.bgImage)})` || ''
    let bgImageRight: string = `url(${NormifyURL(content.bgImageRight)})`|| ''
    let bgImageLeft: string = `url(${NormifyURL(content.bgImageLeft)})` || ''
    let [smallScreenSize, setSmallScreenSize] = useState<boolean>(true);
    let [countDownTo, setCountDownTo] = useState<Date|string|number|undefined>(content.CountDownTo)
    useEffect(() => {
        setSmallScreenSize(window.innerHeight > 600)
        setCountDownTo(content.CountDownTo)
        return () => {
            setSmallScreenSize(true)
        }
    }, [smallScreenSize, content])
  return (
    <section className={`relative py-10 transition-all`}>
        <div className={`absolute -z-20 top-0 left-0 w-full h-full ${content.bg_dark? 'bg-gray-700':''}`}>
            <div className={`h-full w-full -z-10 top-0 left-0 flex flex-col md:flex-row bg-center bg-no-repeat bg-cover`} style={{backgroundImage: bgImage}}>
                <div className='bg-cover m-0 h-full w-full md:w-1/2 bg-center bg-no-repeat' style={{backgroundImage: bgImageLeft}}>
                </div>
                <div className='bg-cover m-0 h-full w-full md:w-1/2 bg-center bg-no-repeat' style={{backgroundImage:bgImageRight}}>
                </div>
            </div>
        </div>
 
        <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 w-full my-0 h-full z-20 transition-all'>
            <div className={`flex h-full w-full mb-2 z-10 flex-col transition-all 
                 ${content.reverse? "md:flex-row-reverse item-center content-center ": "md:flex-row item-center content-center "}`}>
                <AnimationOnScroll initiallyVisible={smallScreenSize} offset={10}  animateIn="animate__fadeInUp" className={`${content.center?'':'md:w-1/2'} ${content.indent?'lg:pl-44 md:w-5/6':''} w-full  transition-all flex flex-col justify-center h-full self-center ${content.reverse?'md:pl-6':'md:pr-6 leading-loose '}`}>
                    <div className={`flex flex-col h-full justify-center text-center ${content.center?'md:px-20':'md:text-left'}`}>           
                        <div className={`${content.bg_dark? 'text-gray-100':'text-gray-900'} font-bold text-xl my-3 leading-loose"`}>
                            <h3 className='text-3xl md:text-4xl py-5'>
                            {content.title}
                            </h3>
                        </div>
                        <p className={`${content.bg_dark? 'text-gray-200':'text-gray-700'} text-lg md:text-xl leading-relaxed`}>
                        {content.message}
                        </p>
                        {content.isCountdown && 
                            <div className={`my-4 ${content.center?"w-full flex justify-center":''}`}>
                                <div className='flex flex-col align-middle'>
                                    <div className={`flex flex-row gap-x-3 text-lg py-2 text-center font-bold mx-auto text-maroon-700 w-full ${content.center?" justify-center":''}`}>
                                        <div>
                                            {content.startDate &&
                                                new Date(content.startDate).toLocaleDateString('en-US', {weekday:'short', year:'numeric', month:'short', day:'numeric'})
                                            }
                                        </div>
                                        <div>-</div>
                                        <div>
                                            {content.endDate &&
                                                new Date(content.endDate).toLocaleDateString('en-US', {weekday:'short', year:'numeric', month:'short', day:'numeric'})
                                            }
                                        </div>
                                    </div>
                                    <CustomCountDown date={countDownTo} />
                                </div>
                            </div>
                        }
                        {content.actions.length !== 0 &&
                            <div  className={` transition-all flex flex-col md:flex-row  my-5 gap-x-2 gap-y-2 md:mt-9 ${content.center?'justify-center':'md:justify-start'}`}>
                                    {content.actions.map(action => {
                                        return ( action.primary ? 
                                            <PrimaryButton text={action.text} key={action.id} link={action.path}/>
                                        :
                                            <SecondaryButton text={action.text} key={action.id} link={action.path}/>
                                        )
                                    })
                                }
                            </div>
                        }
                    </div>
                </AnimationOnScroll>
                
                {
                !content.center && 
                    <AnimationOnScroll initiallyVisible={smallScreenSize} animateIn='animate__fadeIn ' delay={50} className='w-full  transition-all flex md:w-1/2 md:h-108 justify-center'>
                        {content.image && 
                            <div  className={`w-full h-full flex ${content.reverse?"justify-start":"justify-end"} `}>
                                <Image src={NormifyURL(content.image)} alt={content.title} width ={400} height={400} className='object-cover sm:w-11/12 bg-center max-h-96 rounded-2xl my-auto' priority={false}/>
                            </div>
                        }
                        {content.carousel &&
                         content.carousel.length !== 0 &&
                            <Carousel 
                            listItem={content.carousel}
                            />
                        }
                    </AnimationOnScroll>
                }
            </div>
        </div>    
    </section>

  )
}

export default Section1