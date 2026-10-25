import Link from "next/link"

export const metadata = {
  title: "Departments | Karen Community SDA",
  description: "Departments | Seventh Day Adventist Church Karen Community",
  openGraph: {
      title: 'Departments | Karen Community SDA',
      description: 'Departments | Seventh Day Adventist Church Karen Community',
    },
};

export default function RootLayout({
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
