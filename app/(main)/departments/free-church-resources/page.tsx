import React from 'react'
import { PrimaryButton } from '../../../../components/buttons'
import Card from '../../../../components/card'
import Cardopportunities from '../../../../components/cardopportunities'

const page = () => {
  return (
    <>
    <div className='h-96 bg-sky-500 relative'></div>
    <div className='absolute top-20 flex justify-center text-align w-full'>
      <div className='mx-auto max-w-7xl pt-1 py-7 px-2 sm:px-6 lg:px-8 flex-col gap-y-3 '>
        <span className='text-4xl text-white  md:text-4xl lg:text-6xl text-800 pt-9 font-bold flex justify-center text-center'>Free resources for churches</span>
        <span className='text-xl text-white text-200 pt-9 font-medium flex justify-center text-center'>We believe local churches like yours are the hope of the world, and we’re passionate about equipping you with free resources, leadership and ministry training, Karen Community online tools, and more.</span>
        <div className='flex flex-row justify-center my-4 '>
          <div className="w-full sm:w-auto ">
            <PrimaryButton
            link="https://www.adventist.org/resources/"
            text ="Explore Free resources"
            />
            </div>
        </div> 
      </div>
    </div>
    <div className='mx-auto max-w-7xl pt-1 py-7 px-2 sm:px-6 lg:px-8'>

      <div className='text-2xl  md:text-3xl lg:text-4xl text-800 pt-9 font-bold flex justify-center text-center'>
          Created for the church by the church
      </div>
      <div className='py-7 px-7 justify-center md:w-full gap-x-4 gap-y-24 flex-wrap'>
      <Card
              image="https://production-cms-assets.life.church/pages/churches/open-lc-homepage-jan-23.png?auto=format&imgixFP=544421859&fm=webp&ixlib=react-9.7.0&w=1000&dpr=1&q=75"
              excerpt="From downloadable sermon outlines to complete kids curriculum packages to message series graphics, Karen Community Open Network has thousands of high-quality, easy-to-use resources that will help you reach the people you’re uniquely called to reach."
              title="Free resources just for you"
              subtitle=""
              reverse
              links={[
                {
                  link: 'https://www.youtube.com/@seventh-dayadventistchurch1345',
                  title: 'see more resources here'
                },
                {
                  link: 'https://vimeo.com/theadventistchurch',
                  title: 'See more videos here'
                }              
              ]}
            />
      </div>
      <div className='text-2xl md:text-3xl lg:text-4xl text-800 my-8 font-bold flex justify-center text-center'>
          Apps that help you grow 
      </div>
      <section className=" py-7 flex flex-row justify-center md:justify-between gap-x-4 gap-y-24 flex-wrap">
          <Cardopportunities 
              title='Bible'
              name='Your word is a lamp to my feet and a light to my path. ~ Psalms 119:105'
              excerpt='Read your bible, pray everyday if you want to grow'
              image='https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGJpYmxlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
              text="Download the Bible"
              link="https://play.google.com/store/apps/details?id=com.offline.bible"
              />
          <Cardopportunities 
              title='Download the Hymnal'
              name='Song books guide us in our worship and help us to give praise.'
              excerpt="Singing is as much an act of worship as Prayer. It makes our worship experience better and enjoyable."
              image='https://images.unsplash.com/photo-1520446266423-6daca23fe8c7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aHltbmFsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60' 
              text="Download the hymnal"
              link="https://play.google.com/store/apps/details?id=sdaHymnalFreeApp.FreeVersion"
              />
          <Cardopportunities 
              title='Download the Ellen White estate'
              name='Study the spirit of prophecy.This complements the supreme teacher- The bible'
              excerpt="There is much to learn here in God's church. be it financial, social or spiritual, there is something to learn something new."
              image='https://images.unsplash.com/photo-1610116306796-6fea9f4fae38?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8Ym9va3N8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60' 
              text="join our class!"
              link="https://play.google.com/store/apps/details?id=egw.estate"
              />
          <Cardopportunities 
              title='Study the lessons here'
              name='Lesson books'
              excerpt="We look at the different lessons we can draw from the Bible. Lessons which affect our daily lives"
              image='https://images.unsplash.com/photo-1546074177-ffdda98d214f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGxlc3NvbnN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60' 
              text="Download app"
              link="https://play.google.com/store/apps/details?id=com.cryart.sabbathschool"
              />

          </section>
        </div>    
    </>
  )
}

export default page