import React from 'react'

export const metadata = {
  title: "What Next | Karen Community SDA",
  description: `The Bible describes the human condition like this: ” ‘There is no one righteous, not even one; there is no one who understands, no one who seeks God. All have turned away, hey have together become worthless; there is no one who does good, lot even one.’… For all have sinned and fall short of the glory of God” Romans 3:10-12, 23).
          The sin problem is universal. No one is exempt. Every man, woman, boy, and girl is infected with the sin virus—a virus that is 100 percent lethal. “For the wages of sin is death” (Romans 6:23). The first step toward salvation from this desperate situation is to recognize that you are a sinner and that it is impossible for you, in your own strength, to resist the power of evil or to save yourself from its fatal results.`,
  openGraph: {
      title: 'What Next | Karen Community SDA',
      description: `The Bible describes the human condition like this: ” ‘There is no one righteous, not even one; there is no one who understands, no one who seeks God. All have turned away, hey have together become worthless; there is no one who does good, lot even one.’… For all have sinned and fall short of the glory of God” Romans 3:10-12, 23).
          The sin problem is universal. No one is exempt. Every man, woman, boy, and girl is infected with the sin virus—a virus that is 100 percent lethal. “For the wages of sin is death” (Romans 6:23). The first step toward salvation from this desperate situation is to recognize that you are a sinner and that it is impossible for you, in your own strength, to resist the power of evil or to save yourself from its fatal results.`,
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