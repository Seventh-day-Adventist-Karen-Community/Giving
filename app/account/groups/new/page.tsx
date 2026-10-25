'use client'

import GroupForm from "../form"


const Page = () => {
    const initData ={
        name: '',
        location:  '',
        meetingTime:'',
        routine:'',
        details: '',
        description: ''
    }
    return(
        <>
            <GroupForm initData={initData} newRecord/>
        </>
        )
}

export default Page