import FetchFAQ from '@data/faq';
import React from 'react'
import FAQContainer from '@components/FAQContainer';
import HeroSecondary from '@components/heroSecondary'
// import data from '../../../../data/giving_faq.json';
export const revalidate = 3600;
export const metadata = {
  title: "FAQ | Giving | Karen Community SDA",
  description: "Frequently Asked Questions | Giving :: Seventh Day Adventist Church Karen Community",
  openGraph: {
      title: 'Frequently Asked Questions | Giving :: Karen Community SDA',
      description: 'Frequently Asked Questions | Giving :: Seventh Day Adventist Church Karen Community',
    },
};


const Page = async () => {
  const data = await FetchFAQ({id:'RmFxQ2F0ZWdvcnlOb2RlOjE='})
  return (
    <>
      <HeroSecondary
        title='Giving FAQs' 
        description='Accountability and integrity are vitally important in every aspect of our church, and it’s no different when it comes to finances. We will always honor your gifts with faithful stewardship, ethical business practices, and transparency so that Karen Community Church remains beyond reproach.'
        center={true}
        className = 'text-gray-900 bg-white'
        />
      <FAQContainer data={data} />
    </>
  )
}

export default Page