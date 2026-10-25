import React from 'react'
import HeroSecondary2 from '../../../components/herosecondary2'

export const metadata = {
  title: "Media | Karen Community SDA",
  description: "Media | Seventh Day Adventist Church Karen Community",
  openGraph: {
      title: 'Media | Karen Community SDA',
      description: 'Media | Seventh Day Adventist Church Karen Community',
    },
};

const Page = () => {
  return (
    <>
    <HeroSecondary2
    title="Coming soon"
    description="The karen community church plans to have you provided with relevant materials online to help you grow your faith, we will have Bible quotes, Spirit of prophecy material and many more"
    bgImageSmall="/LandingPage.png"
    bgImageLarge="/LandingPage.png"
    secondaryLink={{ link: "./contact-us", title: "Visit us physically" }}
    outlineLink={{ link: "/group/search", title: "Find someone to talk to" }}
  />
    </>
  )
}

export default Page