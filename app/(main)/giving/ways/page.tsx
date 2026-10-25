import React from 'react'
import { FaBitcoin, FaChevronCircleRight } from 'react-icons/fa'
import {AiOutlineKey, AiOutlineStock, AiTwotoneCalendar} from 'react-icons/ai'
import { TextButton } from '../../../../components/buttons'
import CardLeaders from '../../../../components/cardLarge'
import HeroSecondary from '../../../../components/heroSecondary'
import IconCard from '../../../../components/iconCard'
import { Constants } from '../../../../utils/constants'

export const metadata = {
  title: "Ways of Giving | Karen Community SDA",
  description: "Ways of Giving | Seventh Day Adventist Church Karen Community",
  openGraph: {
      title: 'Ways of Giving | Karen Community SDA',
      description: 'Ways of Giving | Seventh Day Adventist Church Karen Community',
      images: ['https://i.swncdn.com/media/800w/cms/CW/Finances/30337-tithe.1200w.tn.webp']

    },
};


const Page = () => {
  return (
    <>
      <HeroSecondary 
        title='Ways to Give' 
        dark
        description='Learn about your options for how you can give at Karen Community'
        bgImageSmall='https://i.swncdn.com/media/800w/cms/CW/Finances/30337-tithe.1200w.tn.webp'
        bgImageLarge='https://i.swncdn.com/media/800w/cms/CW/Finances/30337-tithe.1200w.tn.webp'
        primaryLink={{link:Constants.GIVING_URL,title:'Give Now'}}
        />
      <section className="pt-16 mx-3 py-7 flex flex-row justify-center lg:justify-between gap-x-2 lg:gap-x-4 gap-y-24 sm:mx-12 lg:mx-20 flex-wrap">
        <CardLeaders 
        title='Make Your Giving Recurring'
        excerpt='Consistently returning the tithe to God has never been easier. See how God will create a deeper heart of generosity in you when you make your gifts recurring. Just tap the recurring toggle and set the frequency that works for you.'
        image='https://www.life.church/assets/pages/ways/give-recurring@2x-91e1cb4e9f7ef7f37936a4b384cc32e88fd51676ad147b76cfd78edb694dae4c.png' 
        />
        <CardLeaders 
        title='Set Up Offerings'
        excerpt={`God made each of us unique including how we make a difference through our giving. You can go beyond the tithe and give directly to a fund that’s meaningful to you. Check out all the ways you can give an offering to Karen Community'`}
        image='https://www.life.church/assets/pages/ways/setup-offerings@2x-d78c0dcdf89fb986978dfd775edb76a57582b7d27695f0f2729c3dbad95e844e.png' 
        />
        <CardLeaders 
        title='Give Quickly, Safely, and Securely'
        excerpt='We won’t get too technical, but your personal data in the Karen.Church app is protected by some of the most powerful digital security systems available.'
        image='https://www.life.church/assets/pages/ways/give-quickly@2x-60f760950631bb8dfae44a43c9ae6c988a8dbed9651f4449053b06abe591e74e.png' 
        />
        <CardLeaders
        title='Manage Your Gift Anytime'
        excerpt='See how God has been faithful as you’ve given over time, how your own generosity has grown, or how you plan to be generous in the future. Manage your upcoming gifts and view your giving history at any time from anywhere.'
        image='https://www.life.church/assets/pages/ways/manage-gifts@2x-60f61b6b1541b15a852c74d7319dfdf5a3c93b9e2f6d55f189cd2b238df68696.png' 
        />
      </section>
      <section className='bg-gray-100 text-gray-600'>
        <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 w-full py-7'>
          <div className='mx-3 sm:mx-auto text-center sm:w-1/2'>
            <h3 className='text-center text-2xl md:text-3xl font-bold leading-10 py-4'>Non-Cash Giving</h3>
            <p className='text-center md:text-lg'>You don’t have to limit your giving to dollars and cents. We can accept non-cash gifts including:</p>
          </div>
          <div className='flex flex-row flex-wrap justify-center sm:justify-between gap-x-2 gap-y-6 my-8'>
            <IconCard 
              icon={<AiOutlineStock size={30}/>}
              content = {`Stocks, bonds and mutual fund shares`}
              buttonInput={{link:'/giving/ways/stocks', text:'Learn More', icon:<FaChevronCircleRight />}}
              /> 
              <IconCard 
              icon={<AiTwotoneCalendar size={30}/>}
              content = {`Retirement, trust, assets and more`}
              buttonInput={{link:'/', text:'Read More', icon:<FaChevronCircleRight />}}
              /> 
              <IconCard 
              icon={<AiOutlineKey size={30}/>}
              content = {`Valuable items like cars, instruments and etc`}
              buttonInput={{link:'https://give.idonate.com/kcc/donate', text:'Large Item Donation Form', icon:<FaChevronCircleRight />}}
              /> 
              <IconCard 
              icon={<FaBitcoin size={30}/>}
              content = {`Cryptocurrency: Bitcoin, Ethereum, and more `}
              buttonInput={{link:'/giving/ways/crypto-currency', text:'Learn More', icon:<FaChevronCircleRight />}}
              />
          </div>
        </div>
      </section>
      <section className=' text-gray-600 py-10'>
        <div className='md:w-1/2 sm:w-2/3 mx-3 md:mx-auto'>
          <h3 className='text-justify text-2xl md:text-3xl font-bold leading-10 py-4'>Have more questions?</h3>
          <p className='text-justify font-normal md:text-lg'>If you’ve got question about what you can give and how to give it, we’d love to help!</p>
          <div className='py-4 w-full'>
            <TextButton link='/giving/faq' text='Learn More' icon ={<FaChevronCircleRight />}/>
          </div>
        </div>
      </section>
    </>
  )
}

export default Page