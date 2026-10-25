 import React from 'react'
import NavbarSec from '../../../../components/navbarSec'
import { Constants } from '../../../../utils/constants';

export const metadata = {
  title: "Youth Department | Karen Community SDA",
  description: `“Like arrows in the hands of a warrior,” (Psalms 127:4) our youth and young adults are designed by God to be sent into the world with the three angels message (Revelation 14:6-12).  This urgent and prophetic message lifts up Jesus as the world’s Savior and His free gift of righteous by faith.
      We also call upon young people to go and be the “Hands and feet of Jesus” in their local churches, on campuses, in the cities, as well as in the unreached countries of the world! In these trying times, the world need Adventists more than ever! We fervently pray that every Seventh-day Adventist young person from ages 4 to 30 will join the world church in saying “I Will Go!`,
  openGraph: {
      title: 'Youth Department | Karen Community SDA',
      description: `“Like arrows in the hands of a warrior,” (Psalms 127:4) our youth and young adults are designed by God to be sent into the world with the three angels message (Revelation 14:6-12).  This urgent and prophetic message lifts up Jesus as the world’s Savior and His free gift of righteous by faith.
      We also call upon young people to go and be the “Hands and feet of Jesus” in their local churches, on campuses, in the cities, as well as in the unreached countries of the world! In these trying times, the world need Adventists more than ever! We fervently pray that every Seventh-day Adventist young person from ages 4 to 30 will join the world church in saying “I Will Go!`,
      images: [`${Constants.IMAGE_BASE_URL}/kcc/Resources/Youth.jpeg`]
    },
};

const Layout = ({
    children,
  }: {
    children: React.ReactNode
  }) => {
  return (
    <>
     <NavbarSec 
        title='What about Karen Youth?'
        links={[
            {
                name:'About',
                path: '/departments/youth'
            },
            {
                name:'Karen Youth',
                path: '/departments/youth/karen-youth'
            },
            {
                name:'Parents',
                path: '/departments/youth/parents'
            }
        ]}
        />
        {children}
    </>
  )
}

export default Layout