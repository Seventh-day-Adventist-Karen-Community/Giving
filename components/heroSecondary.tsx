import React from 'react'
import { OutlineButton, PrimaryButton, SecondaryButton } from './buttons'

type buttonType = {
  link:string,
  title: string
}

interface props {
    title: string,
    description?:string, 
    primaryLink?:buttonType
    secondaryLink?:buttonType,
    outlineLink?:buttonType,
    bgImageLarge?:string,
    bgImageSmall?:string,
    center?: boolean,
    className?: string,
    dark?:boolean,
    isVideo?: boolean,
    overLayBgColor?: string,
    height?:string,
}

const HeroText = (props:props) =>{
    return(
      
    <div className=
      {`mx-auto max-w-7xl px-4
        ${props.className?props.className:'text-white'} 
        flex flex-col w-full ${props.center?'sm:px-24 md:px-32 lg:px-36':'md:w-2/3 lg:w-1/2 md:mx-28 sm:px-12 lg:px-10 '} 
        h-full justify-center align-top text-center md:text-left`}>
          
    <div className='w-full flex-0'>
      <h1 className={`text-3xl font-bold pb-5 ${props.center?'text-center md:text-4xl leading-10':'md:text-5xl leading-9'}`}>{props.title}</h1>
      <p className={`text-md md:text-lg leading-8 ${props.center?'text-center':''}`}>{props.description}</p>
      <div className="mt-8 sm:mt-8 flex flex-col md:flex-row gap-x-5 gap-y-4 justify-start">
        {props.primaryLink && 
          <PrimaryButton link={props.primaryLink.link} text={props.primaryLink.title}/>
        }
        {props.secondaryLink && 
          <SecondaryButton link={props.secondaryLink.link} text={props.secondaryLink.title}/>
        } 
        {props.outlineLink && 
          <OutlineButton link={props.outlineLink.link} text={props.outlineLink.title}/>
        }
      </div>
    </div>
  </div>
  
    )
  }
  

const HeroSecondary = (props:props) => {
  return (
    <>
    <div className={` relative bg-center bg-no-repeat w-full bg-cover sm:hidden ${props.className ? props.className:'bg-gray-800'} `} style={{backgroundImage: `url(${props.bgImageSmall})`, height:props.height??'24rem'}}>
       {!props.isVideo?
        <div className={`absolute ${props.dark ?` bg-gray-900 bg-opacity-50 ${props.overLayBgColor} `:"bg-transparent"} w-full h-full top-0 left-0`}>
          <HeroText {...props}/>
        </div>
        :
        <>
          <iframe className='w-full h-full absolute top-0 left-0' width="560" height="315" src={props.bgImageLarge} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;">
          </iframe>
          <div className={`absolute ${props.dark ?"bg-gray-900 z-10 bg-opacity-50":"bg-transparent"} w-full h-full top-0 left-0`}>
              <HeroText {...props}/>
          </div>
        </>
        }
      </div>
      <div className={`relative bg-center bg-no-repeat w-full bg-cover hidden sm:block ${props.className ? props.className:'bg-gray-800'}`} style={{backgroundImage: `url(${props.bgImageLarge})`, height:props.height??'24rem'}}>
        {!props.isVideo?
        <div className={`absolute ${props.dark ?`bg-gray-900 bg-opacity-50 ${props.overLayBgColor} `:"bg-transparent"} w-full h-full top-0 left-0`}>
          <HeroText {...props}/>
        </div>
        :
        <>
          <iframe className='w-full h-full absolute top-0 left-0' width="560" height="315" src={props.bgImageLarge} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;">
          </iframe>
          <div className={`absolute ${props.dark ?"bg-gray-900 z-10 bg-opacity-50":"bg-transparent"} w-full h-full top-0 left-0`}>
              <HeroText {...props}/>
          </div>
        </>
        }
      </div>
    </>
    
  )
}

export default HeroSecondary