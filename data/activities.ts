import React from 'react'
import { gql } from "@apollo/client";
import client from "../apollo-client";
import { PaginationType } from '../types/paginationType';
import { NormifyB64 } from '../utils/normify-url';
import { ActivityType, CreateActivityType } from '../types/activities';
import { FormatFriendlyDate, FormatFriendlyDateTime } from '../utils/constants';

function serialize_activities(data:any):ActivityType[]{
    return data?.edges.map((act:any) => {
        return({
            ...act.node,
            startDate: new Date(act.node.startDate).toLocaleDateString(),
            endDate: new Date(act.node.endDate).toLocaleDateString(),
        })
    })
}


const FetchActivities = async ({before, after, department}:{before?:string, after?:string, department?:string}) => {
    let nomifiedB64 = department ? NormifyB64(department):''
    // console.log(nomifiedB64)
    const {data, loading} = await client.query({
        variables:{ 
            department: nomifiedB64
        },
        query: gql`        
        query Activities($department: String){
            activities(department_No: $department){
              edges{
                node{
                  id
                  title
                  department{
                    id
                    no
                    description
                    title
                  }
                  image
                  startDate
                  endDate
                  amount
                  slots
                  status
                  description
                  no
                  canModify
                }
              }
              pageInfo{
                hasNextPage
                hasPreviousPage
                startCursor
                endCursor
              }
            }
          }
        `
    })
    const activities:ActivityType[] =  serialize_activities(data.activities)
    const pageInfo:PaginationType = data.pageInfo
  return { activities:activities, pageInfo: pageInfo, loading: loading}
}

export default FetchActivities


export const FetchActivity = async ({id}:{id:string}) => {
    const {data, loading} = await client.query({
        variables:{ 
            id:NormifyB64(id)
        },
        query: gql`
        query Activity($id:ID!){
            activity(id:$id){
              id
              title
              department{
                id
                no
                description
                title
              }
              image
              startDate
              endDate
              amount
              slots
              status
              description
              no
              canModify
            }
          }          
        `
    })
    const activity:ActivityType =  {
        ...data.activity, 
        startDate: new Date(data.activity.startDate),
        endDate: new Date(data.activity.endDate),
    }
  return activity
}


export const CreateActivity =async (activity:CreateActivityType)=>{
  // console.log(activity)
  const startDate = activity.startDate.toJSON()
  const endDate = activity.endDate.toJSON()
  const {data} = await client.mutate({
      mutation:gql`        
        mutation CreateActivity($title: String!, $description: String!, $startDate: DateTime!, $endDate:DateTime!, $slots:Int, $amount: Decimal, $image: Upload){
          createActivity(input:{title: $title, description:$description, startDate: $startDate, endDate:$endDate, slots:$slots, amount:$amount, image: $image}){
            activity{
              id
              no
              title
              description
              amount
              slots
            }
          }
        }
      `,
      variables:{
          title: activity.title,
          description: activity.description,
          department: activity.department,
          startDate: startDate,
          endDate: endDate,
          slots: activity.slots,
          amount: activity.amount,
          image: activity.image
      }
  })
  if(data.createActivity.activity){
      return {success:true}
    }
  return {success:false}
}

export const UpdateActivity =async (activity:CreateActivityType)=>{
  const startDate = activity.startDate.toJSON()
  const endDate = activity.endDate.toJSON()
  const id = NormifyB64(activity.id)
  // console.log(startDate, endDate)
  const {data} = await client.mutate({
      mutation:gql`
        mutation UpdateActivity($id:ID!, $title: String!, $description: String!, $startDate: DateTime!, $endDate:DateTime!, $slots:Int, $amount: Decimal, $image: Upload){
          updateActivity(input:{id:$id, title: $title, description:$description, startDate: $startDate, endDate:$endDate, slots:$slots, amount:$amount, image: $image}){
            activity{
              id
              no
              title
              description
              amount
              slots
            }
          }
        }      
      `,
      variables:{
          id: id,
          title: activity.title,
          description: activity.description,
          department: activity.department,
          startDate: startDate,
          endDate: endDate,
          slots: activity.slots,
          amount: activity.amount,
          image: activity.image
      }
  })
  // console.log(data)
  if(data.updateActivity.activity){
      return {success:true}
    }
  return {success:false}
}

export const DeleteActivity =async (activity:ActivityType)=>{
  let id = NormifyB64(activity.id)
  const {data} = await client.mutate({
      mutation:gql`        
        mutation DeleteActivity($id:ID!){
          deleteActivity(input:{id:$id}){
            status
          }
        }
      `,
      variables:{
          id: id
      }
  })
  // console.log(data)
  if(data.status){
      return {success:true}
    }
  return {success:false}
}


export const ChangeActivityStatus = async ({status, activityIdList}:{status: string, activityIdList: string[]})=>{
  const {data} = await client.mutate({
    mutation: gql`      
      mutation ChangeActivityStatus($activityIdList:[ID]!, $status:String!){
        changeActivityStatus(input:{activityIdList:$activityIdList, status:$status}){
          success
        }
      }
    `,
    variables:{
      activityIdList: activityIdList,
      status: status
    }
  })
  return data.changeActivityStatus.success
}
