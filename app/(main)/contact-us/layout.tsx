import React from 'react'
import NavbarSec from '../../../components/navbarSec'

export const metadata = {
  title: "Contact Us | Karen Community SDA",
  description: "P.O Box 15973 - 00509 Karen, Nairobi Kenya · Karen, Nairobi · info@sdackc.org · + 254 748 826 726 · www.sdackc.org · SDAChurchKaren · @SDAChurchKaren · @sdachurchkaren.",
  openGraph: {
      title: 'Contact Us | Karen Community SDA',
      description: 'P.O Box 15973 - 00509 Karen, Nairobi Kenya · Karen, Nairobi · info@sdackc.org · + 254 748 826 726 · www.sdackc.org · SDAChurchKaren · @SDAChurchKaren · @sdachurchkaren.',
    },
};

const Layout = ({children,
}: {
  children: React.ReactNode
}) => {
  return (
    <>
        <NavbarSec 
        title='Contact Us'
        />
        {children}
    </>
  )
}

export default Layout