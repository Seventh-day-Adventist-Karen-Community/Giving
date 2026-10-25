import React from 'react'

export const metadata = {
    title: "Reset Your Password | Karen Community SDA",
    description: "Reset Your Password | Seventh Day Adventist Church Karen Community",
    openGraph: {
        title: 'Reset Your Password | Karen Community SDA',
        description: 'Reset Your Password | Seventh Day Adventist Church Karen Community',
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
