import React from 'react'

export const metadata = {
  title: "Mission | Karen Community SDA",
  description: "Mission | Seventh Day Adventist Church Karen Community",
  openGraph: {
      title: 'Mission | Karen Community SDA',
      description: 'Mission | Seventh Day Adventist Church Karen Community',
    },
};

const Page = () => {
  return (
    <div className='w-full'>
        <iframe src="https://www.adventistmission.org/" className='w-full h-screen' name='Adventist Beliefs'></iframe>
    </div>
  )
}

export default Page