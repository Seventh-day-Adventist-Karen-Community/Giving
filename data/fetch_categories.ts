import { gql } from '@apollo/client'
import client from '../apollo-client'

export const FetchCommunityTypes = async () => {
    const {data, loading} = await client.query({
        query: gql`
            query communityTypes{
                communityTypes{
                    edges{
                        node{
                            name
                            id
                            description
                            category
                            color
                            sequenceNo
                        }
                    }
                }
            }
        `
    })
    if(data.communityTypes){

        return {
            success:true, 
            data: data.communityTypes.edges.map((communityType:any)=>{
                return({
                    ...communityType.node
                })
        })}
    }
    return {success:false, data:undefined}
}

export const FetchAgeGroups = async () => {
    const {data, loading} = await client.query({
        query: gql`
            query AgeGroups{
                ageGroups{
                    edges{
                        node{
                            name
                            id
                            description
                        }
                    }
                }
            }          
        `
    })
    if(data.ageGroups){
        return {
            success:true, 
            data: data.ageGroups.edges.map((ageGroup:any)=>{
                return({
                    ...ageGroup.node
                })
        })}
    }
    return {success:false, data:undefined}
}

export const FetchMeetingDays = async () => {
    const {data, loading} = await client.query({
        query: gql`
            query MeetingDays{
                meetingDays{
                    edges{
                        node{
                        name
                        id
                        description
                        sequenceNo
                        }
                    }
                }
            }       
        `
    })
    if(data.meetingDays){
        return {
            success:true, 
            data: data.meetingDays.edges.map((meetingDay:any)=>{
                return({
                    ...meetingDay.node
                })
        })}
    }
    return {success:false, data:undefined}
}
