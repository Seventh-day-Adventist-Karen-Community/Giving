'use client'

import { notFound } from 'next/navigation';
import React from 'react'
import { FetchGroup } from '../../../../../data/groups';
import { CreateGroupType, GroupType, RoutineChoicesObject } from '../../../../../types/groupType';
import GroupForm from '../../form';

const Page = async ({ params,searchParams,}: {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined }}) =>{
    const data = await FetchGroup(params)
    if(!data){
        return notFound()
    }
    function FormatData():CreateGroupType{
        return({
            ...data,
            routineLabel: RoutineChoicesObject.filter((routine)=> routine.value == data.routine)[0].label,
            communityTypeLabel: data.communityType.name || '',
            name: data.title,
            meetingTime: data.time,
            communityType: data.communityType.id,
            ageGroup: data.ageGroups || '',
            ageGroupLabel: data.ageGroup,
            imageName: data.image,
            image: '',
            meetingDays:data.meetingDays.edges.map((day:any)=> {
                return({label: day.node.name, value: day.node.id})
            }),
            meetingDaysList: data.meetingDays.edges.map((day:any)=> {
                return(day.node.name)
            }),
            errored: false,            
        })
    }
    const group = FormatData()
    // console.log(data,group)
  return (  
        <>
            <GroupForm initData={group}/>
        </>
  )
}

export default Page