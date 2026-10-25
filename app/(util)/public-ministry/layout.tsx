import React from 'react'

export const metadata = {
  title: "Write An Uplifting Quote | Karen Community SDA",
  description: "Write An Uplifting Quote | Seventh Day Adventist Church Karen Community",
  openGraph: {
      title: 'Write An Uplifting Quote | Karen Community SDA',
      description: 'Write An Uplifting Quote | Seventh Day Adventist Church Karen Community',
    },
};
const Layout = ({
    children,
  }: {
    children: React.ReactNode
  }) => {
  return (
    <div className='bg-slate-50'>{children}</div>
  )
}

export default Layout