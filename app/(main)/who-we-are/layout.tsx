import React from 'react'
import NavbarSec from '@components/navbarSec'
import { Constants } from '@utils/constants'

export const metadata = {
  title: "Who we are | Karen Community SDA",
  description: "Karen Community started as a prayer-cell in September 2011 where a few families met occasionally in their homes for prayer and Bible study.",
  openGraph: {
      title: 'Who we are | Karen Community SDA',
      description: 'Karen Community started as a prayer-cell in September 2011 where a few families met occasionally in their homes for prayer and Bible study.',
      images: [`${Constants.IMAGE_BASE_URL}/kcc/media/homepage_sections/WelcomeBG.png`]
    },
};
const Layout = ({children,
}: {
  children: React.ReactNode
}) => {
  return (
    <>
        <NavbarSec 
        title='About Us'
        links={[
            {
                name:'Who We Are',
                path: '/who-we-are'
            },
            {
                name:'Our Beliefs',
                path: '/who-we-are/our-beliefs'
            },
            {
                name:'What To Expect',
                path: '/who-we-are/what-to-expect'
            }
        ]}
        />
        {children}
    </>
  )
}

export default Layout