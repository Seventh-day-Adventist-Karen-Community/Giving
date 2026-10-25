'use client'

import Image from 'next/image'
import { OutlineButton,  SecondaryButton } from './buttons'
import { Constants } from '../utils/constants'
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { MainCarouselContent } from '../types/sectionContent';
import { NormifyURL } from '../utils/normify-url';

export default function Hero({carousels}: {carousels:MainCarouselContent[]}) {
  const items = carousels?.map((carousel)=>{
    return(<HeroItem key={carousel.id} {...carousel}/>)
  })

  return (
   <div>
      <AliceCarousel mouseTracking items={items} autoPlay autoPlayInterval={5000} animationDuration={2000} animationType='fadeout' infinite disableDotsControls/>
    </div>
  )
}

function HeroItem({bgImage, title, image, description, justify,dark}:MainCarouselContent){
  let justifyClass = justify==='A_0'?' sm:justify-start sm:text-left ':justify==='A_1'?" sm:content-center justify-center ":' sm:justify-end sm:text-right '
  return(
    <div className="relative h-screen bg-cover bg-center" 
      style={{backgroundImage: `url(${NormifyURL(bgImage)})`, height:'90vh'}}>
      <div className={`absolute top-0 right-0  bottom-0 left-0 ${dark?"bg-gray-100":"bg-gray-900"} opacity-40 hidden`}></div>
      
      <div className={`w-full h-full mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-center text-center 
              ${justifyClass}
              `}>
        <main className="z-10 w-full sm:w-2/3">
          <div>
            <h2 className={`text-4xl flex justify-center w-full tracking-tight leading-10 font-extrabold sm:text-4xl ${dark?"text-gray-900":"text-white"} sm:leading-none md:text-6xl pb-5
              ${justifyClass}
            `}>
              <Image alt={title} src={NormifyURL(image)} width={350} height={200} priority={false} className='object-contain max-h-40'/>
            </h2>
            <div className={`flex text-center flex-row ${justifyClass} w-full`}>
              <p className={`mt-3 ${dark?"text-gray-900":"text-white"} sm:mt-5 sm:max-w-2xl md:mt-5 text-xl md:text-2xl font-light`}>
                {description}
              </p>
            </div>
            <div className={`mt-8 sm:mt-8 flex flex-col md:flex-row gap-x-5 gap-y-4 ${justifyClass}`}>
                <SecondaryButton link='/who-we-are' text='Learn More' dark={dark}/>
                <OutlineButton link={Constants.STUDIO_URL} text='Attend Online' dark={dark}/>
            </div>
          </div>
        </main>               
      </div>
    </div>
  )
}
