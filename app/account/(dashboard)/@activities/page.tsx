import Link from 'next/link'
import React from 'react'
import FetchActivities from '@data/activities'

const Page = async () => {
    const {activities} = await FetchActivities({})
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Activities Queue</h2>
            <div className="space-y-4 max-h-96 overflow-auto">
                {activities.length !== 0 ? activities.map(activity=>{
                    return(
                        <div key={activity.no} className="p-4 bg-white border rounded-xl text-gray-800 space-y-2">
                            <div className="flex justify-between">
                                <div className="text-gray-400 text-xs">{activity.no}</div>
                                <div className="text-gray-400 text-xs">{activity.slots !== 0 && `${activity.slots} slots`}</div>
                            </div>
                            <Link href={`account/activities/${activity.id}`} className="font-bold hover:text-yellow-800 hover:underline">{activity.title}</Link>
                            <div className="text-sm text-gray-600">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" className="text-gray-800 inline align-middle mr-1" viewBox="0 0 16 16">
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                                </svg>{`${activity.startDate} ${activity.endDate && " - " + activity.endDate}`}
                            </div>
                        </div>
                    )
                }) 
                :
                    <div className="p-4 bg-white border rounded-xl text-gray-800 space-y-2">
                        <div className="flex justify-between">
                            <div className="text-gray-400 text-xs"></div>
                            <div className="text-gray-400 text-xs"></div>
                        </div>
                        <div className="font-bold ">No Activity Scheduled.</div>
                    </div>
                }
            </div>
        </div>
    )
}

export default Page