import React from 'react'

export const metadata = {
  title: "Store | Karen Community SDA",
  description: "Store | Seventh Day Adventist Church Karen Community",
  openGraph: {
      title: 'Store | Karen Community SDA',
      description: 'Store | Seventh Day Adventist Church Karen Community',
    },
};


const Layout = ({
    children,
  }: {
    children: React.ReactNode
  }) => {
  return (
    <div>{children}</div>
  )
}

export default Layout