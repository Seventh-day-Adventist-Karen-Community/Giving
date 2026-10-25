import React from 'react'

export const metadata = {
    title: "Create A New Account | Karen Community SDA",
    description: "Create A New Account | Seventh Day Adventist Church Karen Community",
    openGraph: {
        title: 'Create A New Account | Karen Community SDA',
        description: 'Create A New Account | Seventh Day Adventist Church Karen Community',
      },
  };

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
   <>
        {children}
    </>
  )
}
