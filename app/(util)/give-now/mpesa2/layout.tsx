import React from 'react'

export const metadata = {
  title: "Give Now | Karen Community SDA",
  description: "Give Now | Seventh Day Adventist Church Karen Community",
  openGraph: {
    title: 'Give Now | Karen Community SDA',
    description: 'Give Now | Seventh Day Adventist Church Karen Community',
  },
};

// The two-column split (fixed image panel on the left, form panel on the
// right) has been removed. The page itself now renders a full-width hero
// with the same background photo and logo, so this layout just needs to
// provide the page background and let the page take the full width.
const Layout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <div className='bg-slate-50 min-h-screen'>
      {children}
    </div>
  )
}

export default Layout