import React from 'react'
import { PrimaryButton } from '../../../../components/buttons'
import Cardopportunities from '../../../../components/cardopportunities'

const Page = () => {
  return (
   <>
   <div className="mx-auto max-w-7xl pt-1 py-7 px-2 sm:px-6 lg:px-8 flex flex-row flex-wrap md:flex-nowrap">
   <div className="">
      <div className=" text-4xl md:text-4xl lg:text-6xl text-800 pt-9 font-bold flex justify-center text-center">
        You can make a difference
      </div>
        <div className="flex justify-center py-10">
            <p className="text-gray-800 text-lg px-14 text-center">
            We believe God gave you unique skills and talents to help change the world around you. At Karen Community SDA church, there are serving opportunities to fit your skills and your schedule!
            </p>
          </div>
          <div className="flex justify-center py-10 px-8">
          <PrimaryButton link="/contact-us" text="Apply online" />
        </div>
      </div>
      <div className=' flex justify-center align-center items-center md:p-4 lg:p-8'>
        <iframe width="342" height="313" src="https://www.youtube.com/embed/iu0a6fT7AUk" title="TOTAL MEMBER INVOLVEMENT" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" ></iframe>
      </div>
        
   </div>
   <div className=" text-2xl md:text-3xl lg:text-4xl text-800 pt-9 font-bold flex justify-center text-center">
        {`Let's get you the right fit`}
      </div>
      <div>
        <p className=" py-8 text-gray-800 text-lg px-14 md:px-22 lg:px-56 text-center">
          Karen Community is full of diverse people, and God made each of us to serve in different ways. Look through the teams below to find an in-person or digital serving opportunity that fits you. Whether you attend a Karen Community location or entirely online, we know there’s a role out there that fits your God-given talents. And don’t worry, we offer specialized training so you can always feel confident each time you serve.
        </p>
      </div> 
        <section className=" mx-auto max-w-7xl pt-1 py-7 px-2 sm:px-6 lg:px-8 flex flex-row justify-center sm:justify-between gap-x-4 gap-y-24 flex-wrap">
        <Cardopportunities 
            title='Join our Tech volunteers'
            name='All you need is IT knowledge'
            excerpt='Our IT team is responsible for the Day to day running of the church software and hardware and ensure that streaming is done well and real time. They also maintain our websites.'
            image='https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dGVjaG5vbG9neXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'
            text="join our tech team"
            link="/contact-us"
             />
        <Cardopportunities 
            title='Join our development team'
            name='Development is not only about building! Join us to know.'
            excerpt="There is much to learn here about the development of God's church. be it financial, social or spiritual, there is something to do."
            image='https://hilmus-tutor.s3.af-south-1.amazonaws.com/kcc/Resources/development.webp' 
            text="join our development team"
            link="/contact-us"
            />
        <Cardopportunities 
            title='Join our Teachers'
            name='Impart Godly skills to everyone in church. Teach as christ taught'
            excerpt="There is much to learn here in God's church. be it financial, social or spiritual, there is something to learn something new."
            image='https://hilmus-tutor.s3.af-south-1.amazonaws.com/kcc/Resources/Kids/Kid6.jpeg' 
            text="join our teachers"
            link="/contact-us"
            />
        <Cardopportunities 
            title='Join our church choir'
            name='The choir brings the singing back to life. Be part of the experience'
            excerpt="If i can sing, so can you, so can everyone"
            image='https://images.unsplash.com/photo-1531660963020-52ba84d92593?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzZ8fGNob2lyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60' 
            text="Join the choir"
            link="/contact-us"
            />

        </section>    
   
<div className=" text-2xl md:text-3xl lg:text-4xl text-800 pt-9 font-bold flex justify-center text-center">
 {` We can't wait to see how the Lord works in your life`}
</div>
<div>
      <p className=" py-8 text-gray-800 text-xl px-14 md:px-22 lg:px-56 text-center  font-medium">
      Serving is one of the best ways to meet people, develop relationships, and grow in your walk with Christ. Trust us, it’ll change your life! 
           </p>
        </div>
</>
  )
}

export default Page
