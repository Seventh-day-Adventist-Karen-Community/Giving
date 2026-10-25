import { type } from 'os';
import React from 'react'
import {  PrimaryButton } from '../../../../../components/buttons'
import CardLeaders from '../../../../../components/cardLarge';
import { FetchDepartmentLeaders, FetchTopLeaders } from '../../../../../data/fetch_leaders';
import { BaseDepartmentDeptTypeChoices } from '../../../../../types/enums';
import { Constants } from '../../../../../utils/constants';
export const revalidate = 3000;


export const metadata = {
  title: " You can make a difference",
  description: ` Psalm 127:4 says, “Like arrows in the hand of a warrior, so are the children of one’s youth.” The youth are the children of a Church. They are her arrows and she is the warrior in the world.`,
  openGraph: {
      title: ' You can make a difference',
      description: ` Psalm 127:4 says, “Like arrows in the hand of a warrior, so are the children of one’s youth.” The youth are the children of a Church. They are her arrows and she is the warrior in the world.`,
      videos: 'https://www.youtube.com/8P2Rm4ybcoY'
    },
};


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
const TextComponent2 = ({
    title,
    description,
  }: {
    title: string;
    description: string;
  }) => {
    return (
      <div className="py-10 text-center flex flex-col gap-y-5 ">
        <h3 className="text:2xl md:text-3xl font-bold text-gray-800">{title}</h3>
        <h2 className="relative text-md sm:text-lg md:text-xl w-full text-center md:w-3/4 self-center text-gray-600">
          {description}
        </h2>
      </div>
    );
  };
const page = async () => {
    const leaders = await FetchDepartmentLeaders(BaseDepartmentDeptTypeChoices.YOUTH)
    return (
    <>
    <div className="mx-auto max-w-7xl pt-1 py-7 px-2 sm:px-6 lg:px-8 flex flex-row flex-wrap md:flex-nowrap">
   <div className="">
      <div className=" text-4xl md:text-4xl lg:text-6xl text-800 pt-9 font-bold flex justify-center text-center">
        You can make a difference
      </div>
        <div className="flex justify-center py-10">
            <p className="text-gray-800 text-lg px-14 text-center">
            Psalm 127:4 says, “Like arrows in the hand of a warrior, so are the children of one’s youth.” The youth are the children of a Church. They are her arrows and she is the warrior in the world.
            </p>
          </div>
          <div className="flex justify-center py-10 px-8">
          <PrimaryButton link="/contactus" text="Join us Today!" />
        </div>
      </div>
      <div className=' flex justify-center align-center items-center md:p-4 lg:p-8'>
        <iframe width="342" height="313" src="https://www.youtube.com/embed/8P2Rm4ybcoY" title="Adventist Youth | Camp Meeting 2022 | Invitation" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" ></iframe>
      </div>
        
   </div>
   <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 bg-gray-200 text-gray-900">
        <TextComponent2
          title="Are you new to Karen community Church?"
          description={`We would love to know more about you and connect you with someone from a Karen community Church or Karen community Church Online.`}
        />
        <div className="flex justify-center py-7">
          <PrimaryButton link="/contact-us" text="Tell us about yourself" />
        </div>
      </div>
      <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 text-gray-900'>
        <TextComponent title ='Our Mission'
          description={`Our mission is to lead people to become fully devoted followers of Christ. That's how we're able to make a difference, and it's the driving force behind everything we do.`}/>
        
        
        <TextComponent title='Your Life' 
          description={
            `Wherever you are in life, you matter and you have a purpose. We want to help you become the person God has created you to be. Your journey has a next step and we'll help you find it. It could start with serving, finding God's vision for your life, giving, or joining us regularly.\n\n You don't have to take the next step alone. With a strong community of friends, you can laugh, grow, and serve with people who genuinely care about you. Find a small group, or LifeGroup, to join you on your journey`
            }/>

        <TextComponent title ='We are Family' 
          description={`Strong families start with solid foundations. That's why we partner with parents to help raise the next generation to become followers of Christ. Your children and teens have opportunities throughout the week to grow relationships with each other and with God`}/>
        
        <TextComponent title='Our community and the world'
          description={`We are passionate about serving the global community and demonstrating God's love to others. Whether in person or online, individually or in groups, within our church and around the world, we are focused on supporting and engaging in relationships that provide relief and restoration to a hurting world.`}/>
        
        <TextComponent title='Our Leadership'
          description='Our Directional Leadership Team works together to shape the vision and direction that we take' />
          
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
            <PrimaryButton link='/contact-us' text='contact a leader'/>
          </div>
        </div>
    </>
  )
}

export default page