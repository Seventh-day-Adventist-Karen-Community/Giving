import React from 'react'
import NavbarSec from '@components/navbarSec'
import { Constants } from "@utils/constants";

export const metadata = {
  title: "Life Groups | Karen Community SDA",
  description: "You were designed by God to live in community. Now is the perfect time to join a LifeGroup, where you can be real and belong.",
  openGraph: {
      title: 'Life Groups | Karen Community SDA',
      description: 'You were designed by God to live in community. Now is the perfect time to join a LifeGroup, where you can be real and belong.',
      images: [
        `${Constants}/kcc/media/groups/group4.jpeg`
      ]
    },
};


const Layout = ({children,
}: {
  children: React.ReactNode
}) => {
  return (
    <>
        <NavbarSec 
        title='What are prayercells?'
        links={[
            {
                name:'Prayer Cells',
                path: '/groups'
            },
            {
                name:'Find A Prayer Cell',
                path: '/group/search'
            },
            {
                name:'Resources',
                path: '/groups/resources'
            }
        ]}
        />
        {children}
    </>
  )
}

export default Layout
