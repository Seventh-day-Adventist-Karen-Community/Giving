import React from 'react'
import { PrimaryButton } from '@components/buttons'
import CardLeaders from '@components/cardLarge'
import HeroSecondary from '@components/heroSecondary'
import { FetchTopLeaders } from '@data/fetch_leaders'
import { Constants } from '@utils/constants'
export const revalidate = 3600;
const TextComponent = ({title, description}:{title:string, description:string}) =>{
  return(
      <div className="py-10 text-center flex flex-col gap-y-5">
          <h3 className="text:2xl md:text-3xl font-bold text-gray-800">{title}</h3>
          <h2 className="relative text-md sm:text-lg md:text-xl w-full text-center md:w-3/4 self-center text-gray-600">
            {description}
          </h2>
        </div>
  )
}

const Page = async () => {
  const leaders = await FetchTopLeaders()
  return (
    <>
    <HeroSecondary
        title='Karen community church wants to make a lasting difference in your life, in our community, and in the world.' 
        center={true}
        dark
        bgImageLarge = {`${Constants.IMAGE_BASE_URL}/kcc/media/homepage_sections/WelcomeBG.png`}
        bgImageSmall={`${Constants.IMAGE_BASE_URL}/kcc/media/homepage_sections/WelcomeBG.png`}
        />
      <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 text-gray-900'>
        <TextComponent title ='Our Mission'
          description={`Our mission is to lead people to become fully devoted followers of Christ. That's how we're able to make a difference, and it's the driving force behind everything we do.`}/>
        <div className="flex justify-center">
          <iframe width="739" height="390" src="https://www.youtube.com/embed/3MmZN4uNxiI" title="SDACKC | Camp Meeting 2022 | Promo" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
        </div>
        
        <TextComponent title='Your Life' 
          description={
            `Wherever you are in life, you matter and you have a purpose. We want to help you become the person God has created you to be. Your journey has a next step and we'll help you find it. It could start with serving, finding God's vision for your life, giving, or joining us regularly.\n\n You don't have to take the next step alone. With a strong community of friends, you can laugh, grow, and serve with people who genuinely care about you. Find a small group, or LifeGroup, to join you on your journey`
            }/>

        <TextComponent title ='Your Family' 
          description={`Strong families start with solid foundations. That's why we partner with parents to help raise the next generation to become followers of Christ. Your children and teens have opportunities throughout the week to grow relationships with each other and with God`}/>
        
        <TextComponent title='Our community and world'
          description={`We are passionate about serving the global community and demonstrating God's love to others. Whether in person or online, individually or in groups, within our church and around the world, we are focused on supporting and engaging in relationships that provide relief and restoration to a hurting world.`}/>
        
        <TextComponent title='Our Leadership'
          description='Our Directional Leadership Team works together to shape the vision and direction of Karen Community.' />
          
         {leaders && 
          <section className=" py-7 flex flex-row justify-center md:justify-between gap-x-4 gap-y-24 flex-wrap">
            {
              leaders.map(leader =>{
                return(
                  <CardLeaders key={leader.no} {...leader} maxImageHeight={303}/>                 
                )
              })
            }
          </section>
          }
          <div className="flex justify-center py-7">
            <PrimaryButton link='/who-we-are/our-beliefs' text='Our Beliefs'/>
          </div>
        </div>
    </>
  )
}

export default Page
