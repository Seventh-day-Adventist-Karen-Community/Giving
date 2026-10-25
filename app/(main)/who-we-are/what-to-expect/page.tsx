import React from 'react'
import HeroSecondary from '@components/heroSecondary'
import CardLeaders from '@components/cardLarge'
import { PrimaryButton } from '@components/buttons'
import { Constants } from '@utils/constants';

export const metadata = {
  title: "What To Expect | Karen Community SDA",
  description: "At Karen community Church, you'll be welcomed into a friendly, casual environment by people who are excited to see you. We want you to have an idea of what to expect when you arrive at a Karen community Church. All you have to do from here is come as you are and find out more for yourself!",
  openGraph: {
      title: 'What To Expect | Karen Community SDA',
      description: `At Karen community Church, you'll be welcomed into a friendly, casual environment by people who are excited to see you. We want you to have an idea of what to expect when you arrive at a Karen community Church. All you have to do from here is come as you are and find out more for yourself!`,
      images: [
        `${Constants.IMAGE_BASE_URL}/kcc/media/homepage_sections/WelcomeBG.png`,
        `${Constants.IMAGE_BASE_URL}/kcc/Resources/Kids/Kids8.jpeg`,
        `${Constants.IMAGE_BASE_URL}/kcc/Resources/Youth.jpeg`,
        `${Constants.IMAGE_BASE_URL}/kcc/Resources/AWM2.jpeg`
      ]
    },
};
const TextComponent = ({title,subtitle, description}:{title?:string,subtitle?:string, description:string}) =>{
  return(
      <div className="py-3 text-center flex flex-col gap-y-3">
          {title &&
          <h3 className="text:2xl pt-8 md:text-2xl font-bold text-gray-900">{title}</h3>
          }
          {subtitle &&
          <h4 className="text:2xl md:text-xl font-bold text-gray-800">{subtitle}</h4>
          }
          <p className="relative text-md md:text-lg w-full text-justify md:text-center md:w-3/4 self-center text-gray-700">
            {description}
          </p>
        </div>
  )
}
const Page = () => {
  return (
    <>
      <HeroSecondary
      className='text-gray-900'
      title='You’re welcome here.' 
      center={true}
      bgImageLarge ={`${Constants.IMAGE_BASE_URL}/kcc/media/homepage_sections/WelcomeBG.png`}
      bgImageSmall= {`${Constants.IMAGE_BASE_URL}/kcc/media/homepage_sections/WelcomeBG.png`}
      />
      {/* <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>What to expect</div> */}
      <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 text-gray-900 flex flex-col gap-y-4'>
        
        <TextComponent title='What to expect at Karen Community Church?' 
          description={
            `At Karen community Church, you'll be welcomed into a friendly, casual environment by people who are excited to see you. We want you to have an idea of what to expect when you arrive at a Karen community Church. All you have to do from here is come as you are and find out more for yourself!`
            }/>
        <TextComponent title='What to expect at Karen Community Church?' 
          subtitle='Sabbath services'
          description={
            `Sabbath services run from morning till evening when the sun sets
            this is in line with what our saviour jesus christ said about keeping the sabbath day holy`
            }/>
        
        <TextComponent
          subtitle='Mid-week services'
          description={
            `Look out for the home page and church whatsapp sites for coming up activities`
            }/>
        <TextComponent
          title='Find your personal next step including:'
          subtitle='A place to belong'
          description={
            `Prayercells are the people you can grow, laugh, and serve with. We have groups for men, women, couples, students, hobbyists, athletes, and more`
            }/>
        
        <TextComponent
          subtitle='A chance to make a difference and grow'
          description={
            `God created you with gifts and skills that you can use to change lives in your community and the
            world. We want to equip you with the tools to develop as a fully devoted follower of Christ. As an
             individual, family, or part of a Prayercell, you can find tools for growth here.`
            }/>
        
        
        <TextComponent title='Your family will enjoy:'
          description='Here, its all about people.' />
         
          <section className=" py-7 flex flex-row justify-center md:justify-between gap-x-4 gap-y-24 flex-wrap">
            <CardLeaders 
            title='Our kids:'
            excerpt='Our children are made in God’s image, and given that God is the embodiment of love (1 John 4:8), it is a wonderful privilege to raise them as good stewards of God’s creation. To fulfill our stewardship responsibilities, we must teach our children the Scripture and show them “what is good,” which includes “acting justly,” “loving mercy,” and “being humble,” as Micah 6:8 says..'
            image={`${Constants.IMAGE_BASE_URL}/kcc/Resources/Kids/Kids8.jpeg`}/>
           
            <CardLeaders 
            title='Our youth'            
            excerpt=' As a wise man once said, “The flower of youth never appears more beautiful than when it bends toward the sun of righteousness.” so mst we ensure that our youth 
            are upright.'
            image={`${Constants.IMAGE_BASE_URL}/kcc/Resources/Youth.jpeg`}/>
            
            <CardLeaders 
            title='Our men'            
            excerpt="Men need encouragement, Godly wisdom, and hope today more than ever. While the world tends to tell men to hide their emotions and act tough, God's Word is filled with men who passionately and whole-heartedly sought God with their heart, mind, and soul! God has a special calling for men to be strong, courageous leaders, and His Scripture can provide the inspiration you need to take daily steps towards your calling."
            image='https://images.unsplash.com/photo-1473642676276-2d4ab561542e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80' />
            
            <CardLeaders 
            title='Our women'            
            excerpt="The Bible is filled with wisdom and encouragement for women of all ages. Let's take a look at Bible verses for women to better understand the special role that God has for all women. We are all created equal in the image of God. You will be inspired and challenged when you realize all that the Lord has in store for you as a woman of God!"
            image={`${Constants.IMAGE_BASE_URL}/kcc/Resources/AWM2.jpeg`} />
            
          </section>
          <TextComponent title='  Your whole family is welcome' 
          description={
            ``
            }/>
            <div className="flex justify-center">
            <iframe src="https://embed.lottiefiles.com/animation/128585"></iframe>
            </div>
          <div className="flex justify-center py-7">
            <PrimaryButton link='/contact-us' text='Find our location'/>
          </div>
        </div>
    </>
  )
}

export default Page