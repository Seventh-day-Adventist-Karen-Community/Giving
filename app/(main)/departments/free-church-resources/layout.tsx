import React from 'react'
import NavbarSec from '../../../../components/navbarSec'

export const metadata = {
  title: "Free Church Resources | Karen Community SDA",
  description: "Free Church Resources | Seventh Day Adventist Church Karen Community",
  openGraph: {
      title: 'Free Church Resources | Karen Community SDA',
      description: 'Free Church Resources | Seventh Day Adventist Church Karen Community',
    },
};


const Layout = ({children,
}: {
  children: React.ReactNode
}) => {
  return (
    <>
        {children}
    </>
  )
}

export default Layout