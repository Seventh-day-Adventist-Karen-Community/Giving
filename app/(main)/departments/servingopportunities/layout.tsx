import React from 'react'
import DropdownManager from '../../../../utils/dropdownManager'

export const metadata = {
  title: "Serving Opportunities | Karen Community SDA",
  description: "We believe God gave you unique skills and talents to help change the world around you. At Karen Community SDA church, there are serving opportunities to fit your skills and your schedule!",
  openGraph: {
      title: 'Serving Opportunities | Karen Community SDA',
      description: 'We believe God gave you unique skills and talents to help change the world around you. At Karen Community SDA church, there are serving opportunities to fit your skills and your schedule!',
    },
};


const Layout = ({
    children,
  }: {
    children: React.ReactNode
  }) => {
  return (
    <DropdownManager>
      {children}    
    </DropdownManager>
  )
}

export default Layout