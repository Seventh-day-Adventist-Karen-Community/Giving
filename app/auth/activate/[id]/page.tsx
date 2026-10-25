import React from 'react'
import Activate from '../activate';

export const metadata = {
    title: "Activate Account | Karen Community SDA",
    description: "Activate Account | Seventh Day Adventist Church Karen Community",
    openGraph: {
        title: 'Activate Account | Karen Community SDA',
        description: 'Activate Account | Seventh Day Adventist Church Karen Community',
      },
  };
  
const Page = ({params}:{params:{id: string}}) => {
   
  return (
    <Activate params={params} />
  )
}

export default Page