import React from 'react'

export const metadata = {
  title: "Tools For Growth | Karen Community SDA",
  description: "Spiritual growth doesn’t just happen during services. Use these apps and resources to seek God during the week.",
  openGraph: {
      title: 'Tools For Growth | Karen Community SDA',
      description: 'Spiritual growth doesn’t just happen during services. Use these apps and resources to seek God during the week.',
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