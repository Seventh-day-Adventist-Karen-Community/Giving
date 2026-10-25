import Link from "next/link"

export const metadata = {
  title: "Authentication | Karen Community SDA",
  description: "Authentication | Seventh Day Adventist Church Karen Community",
  openGraph: {
      title: 'Authentication | Karen Community SDA',
      description: 'Authentication | Seventh Day Adventist Church Karen Community',
    },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
   <div className="bg-slate-50">
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-lg sm:max-w-md">
                {children}
                <p className="mt-1 text-xs font-light text-center text-gray-700">
                  <Link href='/' className="font-medium hover:underline">
                      Back Home
                  </Link>
              </p>
            </div>
        </div>
    </div>
  )
}
