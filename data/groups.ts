import React from 'react'
import { gql } from "@apollo/client";
import client from "../apollo-client";
import { ContactMethod, GroupCommunityTypesCategory, GroupType, StatusChoices } from '../types/groupType';
import { PaginationType } from '../types/paginationType';
import { CreateGroupType } from '../types/groupType';
import { NormifyB64 } from '../utils/normify-url';

function serialize_groups(data:any):GroupType[]{
    return data.edges.map((group:any) => {
        return({
            ...group.node,
            title: group.node.name,
            time: group.node.meetingTime,
            ageGroup: group.node.ageGroup.name,
            days: group.node.meetingDays.edges?.[0]?.node.name,
            category: group.node.communityType.name,
            kidsAllowed: group.node.communityType.category !== GroupCommunityTypesCategory.ADULT
        })
    })
}

function serialize_group(data:any):GroupType{
    return({
        ...data,
        title: data.name,
        details: data.details,
        time: data.meetingTime,
        ageGroup: data.ageGroup.name,
        ageGroups: data.ageGroup.id,
        days:data.meetingDays.edges?.[0]?.node.name,
        communityTypes: data.communityType.id,
        category: data.communityType.name,
        kidsAllowed: data.communityType.category !== GroupCommunityTypesCategory.ADULT,
        leaders: data.leaders.edges?.map((leader:any )=> {
            return({
                fullName: leader.node.firstName+' '+ leader.node.lastName
            })
        })
    })
}

const FetchGroups = async ({before, after, leader}:{before?:string, after?:string, leader?:string}) => {
    const {data, loading} = await client.query({
        variables:{ 
            status: leader? null : StatusChoices.ACCEPTED,
            first: 50,
            after: after,
            before: before,
            leader: leader
        },
        query: gql`
        query Groups($status: GroupsGroupStatusChoices, $first: Int, $after: String, $before: String, $leader:ID) {
          groups(status: $status, first: $first, after: $after, before: $before, leaders_Id:$leader) {
            edges {
              node {
                no
                id
                name
                details
                description
                location
                meetingTime
                color
                details
                image
                modified
                created
                canModify
                communityType {
                  id
                  name
                  description
                  category
                }
                status
                meetingDays {
                  edges {
                    node {
                      name
                      id
                    }
                  }
                }
                ageGroup {
                  id
                  name
                  sequenceNo
                }
                routine
                no
              }
            }
            pageInfo {
              hasNextPage
              hasPreviousPage
              startCursor
              endCursor
            }
          }
        }                       
        `
    })
    const groups:GroupType[] =  serialize_groups(data.groups)
    const pageInfo:PaginationType = data.pageInfo
  return { groups:groups, pageInfo: pageInfo, loading: loading}
}

export default FetchGroups

export const FetchAcceptedGroupCount = async() =>{
    const {data} = await client.query({
        query: gql`
            query GroupAcceptedCount{
                groupsAcceptedCount
            }
        `
    })
    return data.groupsAcceptedCount
}

export const FetchGroup = async(params:{id:string}) =>{
    const {data} = await client.query({
        variables:{
            id: NormifyB64(params.id)
        },
        query:gql`        
            query Group($id: ID!) {
                group(id: $id) {
                no
                id
                name
                details
                description
                location
                meetingTime
                color
                details
                image
                canModify
                communityType {
                    id
                    name
                    description
                    category
                }
                status
                meetingDays {
                    edges {
                    node {
                        name
                        id
                    }
                    }
                }
                ageGroup {
                    id
                    name
                    sequenceNo
                }
                routine
                no
                leaders{
                    edges{
                      node{
                        id
                        firstName
                        lastName
                        email
                      }
                    }
                  }
                }
            }            
        `
    })
    const group:GroupType = serialize_group(data.group)
    return group
}


export const FetchContactMethods = async() =>{
  const {data} = await client.query({
      query:gql`        
        query ContactMethods{
          contactMethods{
            edges{
              node{
                id
                name
                preference
              }
            }
          }
        }    
      `
  })

  const contactMethod:ContactMethod[] = data.contactMethods.edges.map((method:any) =>{
    return({
      ...method.node
    })
  })
  return contactMethod
}


export const CreateGroup = async (newGroup:CreateGroupType)=>{
  const {data} = await client.mutate({
    mutation:gql`
      mutation CreateGroup($name:String!, $details:String!, $description:String!, $location: String!, $routine: String!,$ageGroup:ID, $meetingTime:Time, $communityType: ID, $meetingDays: [ID]!, $image:Upload){
        createGroup(input:{name:$name, details:$details, description:$description, location: $location, routine:$routine, ageGroup:$ageGroup, meetingTime:$meetingTime, communityType: $communityType, meetingDays: $meetingDays, image:$image}){
          group{
            no
            name
            details
            description
            
          }
        }
      }   
    `,
    variables:{
      name: newGroup.name,
      details: newGroup.details,
      description: newGroup.description,
      location: newGroup.location,
      routine: newGroup.routine,
      ageGroup: newGroup.ageGroup,
      meetingTime: newGroup.meetingTime,
      communityType: newGroup.communityType,
      meetingDays: newGroup.meetingDaysList,
      image: newGroup.image
    }
  })
  if(data.createGroup.group){
    return {success:true}
  }
  return {success:false}
}
export const UpdateGroup = async (newGroup:CreateGroupType)=>{
  const {data} = await client.mutate({
    mutation:gql`
      mutation UpdateGroup($id:ID!, $name:String!, $details:String!, $description:String!, $location: String!, $routine: String!,$ageGroup:ID, $meetingTime:Time, $communityType: ID, $meetingDays: [ID]!, $image:Upload){
        updateGroup(input:{id:$id name:$name, details:$details, description:$description, location: $location, routine:$routine, ageGroup:$ageGroup, meetingTime:$meetingTime, communityType: $communityType, meetingDays: $meetingDays, image:$image}){
          group{
            no
            name
            details
            description            
          }
        }
      }
    `,
    variables:{
      id: newGroup.id,
      name: newGroup.name,
      details: newGroup.details,
      description: newGroup.description,
      location: newGroup.location,
      routine: newGroup.routine,
      ageGroup: newGroup.ageGroup,
      meetingTime: newGroup.meetingTime,
      communityType: newGroup.communityType,
      meetingDays: newGroup.meetingDaysList,
      image: newGroup.image
    }
  })
  if(data.updateGroup.group){
    return {success:true}
  }
  return {success:false}
}

