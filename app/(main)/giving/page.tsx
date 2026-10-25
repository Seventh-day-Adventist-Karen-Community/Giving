import React from 'react'
import { FaChevronCircleRight } from 'react-icons/fa'
import { RiDoubleQuotesL } from 'react-icons/ri'
import { TextButton } from '@components/buttons'
import CardLeaders from '@components/cardLarge'
import HeroSecondary from '@components/heroSecondary'
import { Constants } from '@utils/constants'

const TextContent = ({title,subTitle,content, quote}:{title:string,subTitle:string,content:string,quote?:string}) =>{
  return(
    <div className='flex flex-col gap-y-4 md:w-2/3 lg:w-3/5 mx-auto text-gray-800 pt-10'>
      <h2 className='text-4xl font-bold text-center'>{title}</h2>
      <h3 className='text-xl md:text-2xl font-semibold text-center text-maroon-700'>{subTitle}</h3>
      <p className='text-gray-700 md:text-lg text-justify'>{content}</p>
      {quote &&
      <div className='text-gray-700 text-lg md:text-xl leading-8 my-5 relative'>
        <div className='absolute text-maroon-100 -z-10'>
          <RiDoubleQuotesL size={100}/>
        </div>
        <div className='z-10 pt-8 pl-8'>
          <em>{quote}</em>
        </div>
      </div>
      }
    </div>
  )
}

const Page = () => {
  return (
    <div className='w-full'>
      <HeroSecondary 
        title='Your giving is changing the world.' 
        description='You can support the work Karen Community is doing in your community and around the world.'
        bgImageSmall={`${Constants.IMAGE_BASE_URL}/kcc/Resources/giving-kcc-back.jpg`}
        bgImageLarge={`${Constants.IMAGE_BASE_URL}/kcc/Resources/giving-kcc-back.jpg`}
        secondaryLink={{link:Constants.GIVING_URL,title:'Give Now'}}
        outlineLink={{link:Constants.GIVING_URL,title:'Non Cash Giving'}}
        />

        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8">
          <div className="rounded-2xl bg-rose-950 text-white px-6 py-8 sm:px-10 sm:py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="max-w-2xl">
              <h2 className="text-2xl sm:text-3xl font-bold">Give online</h2>
              <p className="mt-3 text-rose-50 leading-relaxed">Give securely through M-Pesa. Enter your contact details, choose your church unit, and add amounts for every giving category that applies to you.</p>
            </div>
            <a href="/giving/online" className="inline-flex items-center justify-center gap-2 rounded-lg bg-white text-rose-950 font-semibold px-6 py-3 hover:bg-rose-50 transition-colors whitespace-nowrap">
              Give online <FaChevronCircleRight aria-hidden="true" />
            </a>
          </div>
        </section>

        <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 w-full my-7'>
          <TextContent title='Tithing' subTitle='When you tithe, you’re trusting God with your finances.'
          content='Tithing is a biblical principle. God calls us to give the first 10% of our income back to Him. We’ve seen God provide abundantly in our church, and we know He will provide abundantly for you and your family when you put Him first in your finances. In fact, it’s the one area in the Bible where God tells you to test Him.'
          quote='"Bring the whole tithe into the storehouse, that there may be food in my house. Test me in this,” says the Lord Almighty, “and see if I will not throw open the floodgates of heaven and pour out so much blessing that there will not be room enough to store it." Malachi 3:10 NIV'
            />
          <TextContent title='Generosity' subTitle='It’s impossible to out-give God, but you’ll never regret trying.'
          content='God gives us good things we don’t deserve and could never earn, like grace and forgiveness. He gave the ultimate gift, His son, for our sins. When you hear us talk about irrational generosity, ​​that’s what we mean. God created you with a generous spirit. We want to help you embrace it by giving beyond your tithe with an offering to one of these causes.'
            />
          
          <section className="pt-16 py-7 flex flex-row justify-center lg:justify-between gap-x-2 lg:gap-x-4 gap-y-24 sm:mx-12 lg:mx-20 flex-wrap">
            <CardLeaders 
            title='New Locations'
            excerpt='Fuel the effort to reach people who don’t know Christ by launching new Karen Community locations. As you invest in helping your church grow, you can trust your gift to New Locations will be maximized as we commit to build each location debt-free.'
            image={`${Constants.IMAGE_BASE_URL}/kcc/Resources/locations.svg`}
            imageWidth={300}
            className='max-w-sm lg:max-w-md'
            />
            <CardLeaders 
            title='Free Resources'
            excerpt={`Equip local churches and leaders all over the world with the tools they need to reach their communities for Christ. Your gifts to Free Resources make it possible for Karen Community to give away resources like the Karen Community Online Platform, kids' curriculum, leadership training, and more.'`}
            image={`${Constants.IMAGE_BASE_URL}/kcc/Resources/bibletranslations.svg`}
            imageWidth={300}
            className='max-w-sm lg:max-w-md'
            />
            <CardLeaders 
            title='Local & Global Missions'
            excerpt='Bring hope and healing to a hurting world by providing relief to people in crisis and transforming lives through relationships. Your gifts to Local & Global Missions will help our church take action alongside like-minded mission partners in our communities and around the world.'
            image={`${Constants.IMAGE_BASE_URL}/kcc/Resources/missions.svg`}
            imageWidth={300}
            className='max-w-sm lg:max-w-md'
            />
            <CardLeaders 
            title='Digital Reach'
            excerpt='Influence the world for Christ and help meet people where they are in their everyday lives. Your gifts to Digital Reach will make it possible for our church to extend our efforts to point people to Christ through worship music, social media, podcasts, and more.'
            image={`${Constants.IMAGE_BASE_URL}/kcc/Resources/digitalreach.svg`}
            imageWidth={300}
            className='max-w-sm lg:max-w-md'
            />
            <CardLeaders 
            title='YouVersion & Bible Translation'
            excerpt='Accelerate efforts to make the Bible available in every language and help lead people toward deeper intimacy with God. Your gifts to YouVersion & Bible Translation will drive our work to develop technology and collaborate with partners so every person on earth can engage with the Bible and know the fullness of God.'
            image={`${Constants.IMAGE_BASE_URL}/kcc/Resources/bibletranslations.svg`}
            imageWidth={300}
            className='max-w-sm lg:max-w-md'
            />
         </section>
        </div>      
         <section className=' text-gray-800 py-10 bg-gray-100 '>
          <div className='md:w-2/3 mx-3 sm:mx-auto'>
            <h3 className='text-justify text-2xl sm:text-3xl font-bold leading-10 py-4'>What happens when I give to Karen Community?</h3>
            <p className='text-justify md:text-lg'>You can find the answer to this question, the most recent financial statements for Karen Community, and the answers to more frequently asked questions on our Giving FAQ page.</p>
            <div className='py-4 w-full'>
              <TextButton link='/giving/faq' text='Learn More' icon ={<FaChevronCircleRight />}/>
            </div>
          </div>
         </section>
    </div>
  )
}

export default Page
