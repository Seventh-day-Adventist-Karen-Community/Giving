import React from 'react'
import { gql } from "@apollo/client";
import client from "../apollo-client";
import { PaginationType } from '../types/paginationType';
import { CreateDepartmentsType, DepartmentsType, LeaderDepartmentType } from '../types/department';
import { NormifyB64 } from '../utils/normify-url';

function serialize_departments(data:any):DepartmentsType[]{
    return data?.edges.map((dept:any) => {
        return({
            ...dept.node,
            leaders: data.leaderSet?.edges?.map((leader:any )=> {
                return({
                    fullName: leader.node.fullName
                })
            })
        })
    })
}

function serialize_department(data:any):DepartmentsType{
    return({
        ...data,
        leaders: data.departmentleaderSet?.edges?.map((leader:any )=> {
            return({
                id: leader.node.id,
                fullName: leader.node.leader.fullName,
                position: leader.node.title
            })
        })
    })
}
function serialize_leader_department(data:any):LeaderDepartmentType{
    return({
        ...data,
        departments: data.departmentleaderSet?.edges?.map((department:any )=> {
            return({
                ...department.node
            })
        })
    })
}

const FetchDepartments = async ({before, after, leader, main, parent}:{before?:string, after?:string, leader?:string, parent?:string, main?:boolean}) => {
    let nomifiedB64 =parent ? NormifyB64(parent):''
    // console.log(nomifiedB64)
    const {data, loading} = await client.query({
        variables:{ 
            parent: nomifiedB64,
            main: main,
            first: 50,
            after: after,
            before: before,
            leader: leader
        },
        query: gql`        
            query Departments($main: Boolean, $parent: ID, $leader: String) {
                departments(main: $main, parent_Id: $parent, leader_No: $leader) {
                edges {
                    node {
                    id
                    no
                    main
                    parent {
                        id
                        no
                        title
                        description
                    }
                    title
                    description
                    image
                    deptType
                    canModify
                    leaderSet {
                        edges {
                        node {
                            id
                            no
                            fullName
                            position {
                            name
                            description
                            }
                        }
                        }
                    }
                    }
                }
                pageInfo {
                    startCursor
                    endCursor
                    hasNextPage
                    hasPreviousPage
                }
                }
            }  
        `
    })
    const departments:DepartmentsType[] =  serialize_departments(data.departments)
    const pageInfo:PaginationType = data.pageInfo
  return { departments:departments, pageInfo: pageInfo, loading: loading, success: departments !== undefined}
}

export default FetchDepartments


export const FetchDepartment = async ({id}:{id:string}) => {
    // console.log(id)
    const {data, loading} = await client.query({
        variables:{ 
            id:NormifyB64(id)
        },
        query: gql`
        query Department($id: ID!) {
            department(id: $id) {
              id
              no
              main
              parent {
                id
                no
                title
                description
              }
              title
              description
              image
              deptType
              canModify
              departmentleaderSet {
                edges {
                  node {
                    id
                    title
                    leader {
                      fullName
                    }
                    position {
                      name
                      description
                    }
                  }
                }
              }
            }
          }
          
        `
    })
    const department:DepartmentsType =  serialize_department(data.department)
  return department
}

export const FetchLeaderDepartment = async ({leader}:{leader?:string}) => {
    try{
        const {data, loading} = await client.query({
            variables:{ 
                leader:leader
            },
            query: gql`        
                query Leader($leader: ID!) {
                    leader(id: $leader) {
                    id
                    no
                    fullName
                    departmentleaderSet {
                        edges {
                        node {
                            id
                            title
                            position {
                            code
                            name
                            description
                            sequenceNo
                            }
                            department {
                                id
                                no
                                main
                                title
                                description
                                image
                                deptType
                                canModify
                            }
                        }
                        }
                    }
                    }
                }  
            `
        })
        const leaderDepartments:LeaderDepartmentType =  serialize_leader_department(data.leader)
        return { leaderDepartments:leaderDepartments}
    }
    catch(e){
        return{FetchLeaderDepartment:{departments:null}}
    }
}


export const CreateDepartments =async (department:CreateDepartmentsType)=>{
    console.log(department)
    const {data} = await client.mutate({
        mutation:gql`        
        mutation CreateDepartment($title:String!, $description:String!, $dept_type:String!, $image:Upload, $parent:ID, $main:Boolean){
            createDepartment(input:{title:$title, description:$description, deptType:$dept_type, image:$image, parent:$parent, main:$main}){
                department{
                    id
                    no
                    title
                    description
                    deptType
                }
            }
        }
        `,
        variables:{
            title: department.title,
            description: department.description,
            dept_type: department.deptType,
            image: department.image,
            parent: department.parent,
            main: department.main
        }
    })
    if(data.createDepartment.department){
        return {success:true}
      }
    return {success:false}
}

export const UpdateDepartments =async (department:CreateDepartmentsType)=>{
    const {data} = await client.mutate({
        mutation:gql`
        mutation UpdateDepartment($id:ID!, $title:String!, $description:String!, $dept_type:String!, $image:Upload){
            updateDepartment(input:{id:$id, title:$title, description:$description, deptType:$dept_type, image:$image}){
              department{
                id
                no
                title
                description
                deptType
              }
            }
          }          
        `,
        variables:{
            id: department.id,
            title: department.title,
            description: department.description,
            dept_type: department.deptType,
            image: department.image
        }
    })
    console.log(data)
    if(data.updateDepartment.department){
        return {success:true}
      }
    return {success:false}
}

