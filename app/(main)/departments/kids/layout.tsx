import React from 'react'
import NavbarSec from '../../../../components/navbarSec'
import { Constants } from "../../../../utils/constants";

export const metadata = {
  title: "Kids Department | Karen Community SDA",
  description: "We’re dedicated to partnering with parents to lead children to become fully devoted followers of Christ. Through age-specific lessons, activities, and small groups, children ages birth to 15 years learn biblical truths and real-life lessons they can apply to their lives every week in KarenCommunityKids.",
  openGraph: {
      title: 'Kids Department | Karen Community SDA',
      description: 'We’re dedicated to partnering with parents to lead children to become fully devoted followers of Christ. Through age-specific lessons, activities, and small groups, children ages birth to 15 years learn biblical truths and real-life lessons they can apply to their lives every week in KarenCommunityKids.',
      images: [
        `${Constants.IMAGE_BASE_URL}/kcc/Resources/Kids/Kid6.jpeg`,
        `${Constants.IMAGE_BASE_URL}/kcc/Resources/Kids/vbs.jpeg`,
        `${Constants.IMAGE_BASE_URL}/kcc/Resources/Kids/Kid2.jpeg`,
        `${Constants.IMAGE_BASE_URL}/kcc/Resources/Kids/Kid1.jpeg`,
        `${Constants.IMAGE_BASE_URL}/kcc/Resources/Kids/Kid3.jpeg`,
        `${Constants.IMAGE_BASE_URL}/kcc/Resources/Kids/Kid4.jpeg`,
        `${Constants.IMAGE_BASE_URL}/kcc/Resources/Kids/Kid5.jpeg`,
        `${Constants.IMAGE_BASE_URL}/kcc/Resources/Kids/Kid7.jpeg`,
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
        title='What about kids?'
        links={[
            {
                name:'About',
                path: '/departments/kids'
            },
            {
                name:'SDA Church Karen Kids',
                path: '/departments/kids/karen-kids'
            },
            {
                name:'Parents',
                path: '/departments/kids/parents'
            }
        ]}
        />
        {children}
    </>
  )
}

export default Layout