import Image from 'next/image'
import React from 'react'
import { PrimaryButton } from './buttons';
interface CardOpportunitiesProps {
    name?: string,
    title: string,
    excerpt: string,
    image: string,
    className?:string,
    imageWidth?: number | `${number}`,
    link:string,
    text:string
}
const cardopportunities = (opportunity:CardOpportunitiesProps) => {
    let width = opportunity.imageWidth || 250;
  return (
    <>
    <div className={` overflow-hidden max-w-xl ${opportunity.className}`}>
            <div className='flex justify-center align-middle'>
                <Image width={width} height={250} className="rounded-full self-center" style={{width:opportunity.imageWidth}} src={opportunity.image} alt={opportunity.title} loading='lazy' quality={55}/>
            </div>
            <div className="py-6 px-6 text-center justify-center">
                <div className="font-bold text-2xl">{opportunity.name}</div>
                <div className="font-bold text-xl mb-2 text-gray-600">{opportunity.title}</div>
                <p className="text-gray-700 text-base text-justify" dangerouslySetInnerHTML = {{__html:opportunity.excerpt}}>
                    {/* {opportunity.excerpt} */}
                </p>
            </div>
            <div className="w-auto my-10 flex flex-row justify-center">
                <div className='md:w-auto w-full'>
                    <PrimaryButton
                    link={opportunity.link}
                    text={opportunity.text}
                    />
                </div>
            </div>
        </div>
    </>
  )
}

export default cardopportunities