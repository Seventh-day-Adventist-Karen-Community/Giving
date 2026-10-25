import { gql } from '@apollo/client'
import React from 'react'
import client from '../apollo-client'
import { BeliefsCategoryType, BeliefsOnlyCategoryType, BeliefsType, CreateBeliefsType } from '../types/detailsType'
import { NormifyURL } from '../utils/normify-url'

function SerializeData(data:any):BeliefsType[]{
    return data.edges.map((belief:any) =>{
        return({
            ...belief.node,
            categoryName: belief.node?.category?.name || '',
            mainPicture: NormifyURL(belief.node.mainPicture)
        })
    })
}
function SerializeCategory(data:any):BeliefsCategoryType[]{
    return data.edges.map((beliefCategory:any) =>{
        return({
            ...beliefCategory.node,
            beliefs: beliefCategory && SerializeData(beliefCategory.node.adventistbeliefsSet)
        })
    })
}

const FetchAdventistBeliefs = async(slug?:string) => {
    const {data, errors } = await client.query({
        query:gql`
        query AdventistBeliefs($slug: String) {
          adventistBeliefs(slug: $slug) {
            edges {
              node {
                id
                content
                category {
                  id
                  slug
                  name
                }
                name
                slug
                content
                mainPicture
                sequenceNo
                modified
                created
                canModify
              }
            }
          }
        }
                
        `,
        variables:{
            slug: slug
        }
    })
    // console.log(data)
    if (data.adventistBeliefs.edges.length ==0)
        return undefined
    let beliefs:BeliefsType[] = SerializeData(data.adventistBeliefs)
  return beliefs
}

export default FetchAdventistBeliefs

export const FetchAdventistBeliefsCategorized = async() => {
    const {data, errors } = await client.query({
        query:gql`
        query AdventistBeliefsCategory{
          adventistBeliefsCategories{
            edges{
              node{
                id
                name
                content
                slug
                adventistbeliefsSet{
                  edges{
                    node{
                      id
                      name
                      content
                      name
                      slug
                      content
                      mainPicture
                      sequenceNo
                      modified
                      created
                      canModify
                    }
                  }
                }
              }
            }
          }
        }       
        `,
        
    })
    if (data.adventistBeliefsCategories.edges.length ==0)
        return undefined
    let beliefsCategory:BeliefsCategoryType[] = SerializeCategory(data.adventistBeliefsCategories)
  return beliefsCategory
}

export const FetchAdventistBeliefsCategories = async() => {
    const {data, errors } = await client.query({
        query:gql`
        query AdventistBeliefsCategory{
          adventistBeliefsCategories{
            edges{
              node{
                id
                name
                content
                slug
              }
            }
          }
        }       
        `,
        
    })
    let beliefsCategory:BeliefsOnlyCategoryType[] = data.adventistBeliefsCategories.edges.map((category:any) => {
      return({
        ...category.node
      })
    })
  return {category:beliefsCategory, success:beliefsCategory!==undefined}
}


export const CreateBelief =async (belief:CreateBeliefsType)=>{
  // console.log(activity)
  const {data} = await client.mutate({
      mutation:gql`        
        mutation CreateBelief($name:String!, $content:String!, $category:ID!, $mainPicture:Upload){
          createBelief(input:{name:$name, content:$content, category:$category, mainPicture:$mainPicture}){
            belief{
              id
              name
              slug
            }
          }
      }
      `,
      variables:{
          name: belief.name,
          content: belief.content,
          category: belief.categoryName,
          mainPicture: belief.mainPicture
      }
  })
  if (data.createBelief.belief){
      return {success:true}
    }
  return {success:false}
}

export const UpdateBelief =async (belief:CreateBeliefsType)=>{
  // console.log(startDate, endDate)
  const {data} = await client.mutate({
      mutation:gql`
        mutation UpdateBelief($id: ID!,$name:String!, $content:String!, $category:ID!, $mainPicture:Upload){
          updateBelief(input:{id: $id, name:$name, content:$content, category:$category, mainPicture:$mainPicture}){
            belief{
              id
              name
              slug
            }
          }
        } 
      `,
      variables:{
        id: belief.id,
        name: belief.name,
        content: belief.content,
        category: belief.categoryName,
        mainPicture: belief.mainPicture
      }
  })
  // console.log(data)
  if (data.updateBelief.belief){
      return {success:true}
    }
  return {success:false}
}

export const DeleteBeliefs =async (beliefs:BeliefsType)=>{
  const {data} = await client.mutate({
      mutation:gql`        
        mutation DeleteBelief($id:ID!){
          deleteBelief(input:{id:$id}){
            status
          }
        }
      `,
      variables:{
          id: beliefs.id
      }
  })
  // console.log(data)
  if(data.status){
      return {success:true}
    }
  return {success:false}
}


