import React from 'react'
import NavbarSec from '@components/navbarSec'
import { Constants } from '@utils/constants'

export const metadata = {
  title: "Giving | Tithe | Offering :: Karen Community SDA",
  description: "You can support the work Karen Community is doing in your community and around the world.",
  openGraph: {
      title: 'Giving | Tithe | Offering :: Karen Community SDA',
      description: 'You can support the work Karen Community is doing in your community and around the world.',
      images: [`${Constants.IMAGE_BASE_URL}/kcc/Resources/giving-kcc-back.jpg`]
    },
};

const Layout = ({children,
}: {
  children: React.ReactNode
}) => {
  return (
    <>
        <NavbarSec 
        title='Giving'
        links={[
            {
                name:'Why Give?',
                path: '/giving'
            },
            {
                name:'Ways to Give',
                path: '/giving/ways'
            },
            {
                name:'FAQ',
                path: '/giving/faq'
            }
        ]}
        />
        {children}
    </>
  )
}

export default Layout
