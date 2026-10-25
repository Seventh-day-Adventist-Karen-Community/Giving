'use server'

import { gql } from '@apollo/client'
import React from 'react'
import client from '../apollo-client'
import { GroupMemberType } from '../types/groupMemberType'

export const JoinMemberMutation = gql`
mutation JoinMember($firstName:String!,$lastName:String!,$group:ID!, $email:String!, $phone: String!, $contactMethods: [ID]){
    createGroupMember(input:{firstName:$firstName, lastName:$lastName, email: $email, phoneNumber:$phone, group:$group, contactMethods:$contactMethods}){
      clientMutationId
      groupMember{
        id
        no
        group{
          id
        }
        firstName
        lastName
        email
        contactMethods{
          edges{
            node{
              id
            }
          }
        }
      }
    }
  }
`

const JoinMember = async (member:any) => {
    console.log('Processed')
    const {data, errors} = await client.mutate({
        variables:{
            ...member
        },
        mutation: JoinMemberMutation
    })
    
    return {data:data.createGroupMember.groupMember, errors}
}

export default JoinMember

export const FetchGroupMembers = async (groupNo: string)=>{
  const {data} = await client.query({
    query: gql`      
      query GroupMembers($group:String){
        groupMembers(group_No:$group){
          edges{
            node{
              id
              no
              firstName
              lastName
              phoneNumber
              email
              status
              contactMethods{
                edges{
                  node{
                    name
                    preference
                  }
                }
              }
            }
          }
        }
      }
    `,
    variables:{
      group: groupNo
    }
  })

  const Members = data.groupMembers.edges.map((member:any) =>{
    return({
      ...member.node,
      contactMethods: member.node.contactMethods.edges.map((method:any) =>{
        return({
          ...method.node
        })
      })
    })
  })
  return Members
}


export const ChangeGroupMembersStatus = async ({status, memberIdList}:{status: string, memberIdList: string[]})=>{
  const {data} = await client.mutate({
    mutation: gql`      
      mutation ChangeGroupMembersStatus($memberIdList:[ID]!, $status:String!){
        changeGroupMembersStatus(input:{memberIdList:$memberIdList, status:$status}){
          success
        }
      }
    `,
    variables:{
      memberIdList: memberIdList,
      status: status
    }
  })
  return data.changeGroupMembersStatus.success
}


