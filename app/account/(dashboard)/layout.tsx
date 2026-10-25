export default function Layout(props: {
    children: React.ReactNode
    activities: React.ReactNode
    finance: React.ReactNode
    header: React.ReactNode
  }) {
    return (
      <>
        <div className="mx-auto">
                <div className=" bg-slate-50 dark:bg-gray-930 rounded-3xl px-2 py-8 sm:px-4 mb-5">
                <h1 className="text-3xl font-bold mb-10">Member Dashboard</h1>
                {props.header}
                <hr className="my-10"/>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-20">
                    {props.finance}
                    {props.activities}
                </div>
                </div>
            </div>
      </>
    )
  }