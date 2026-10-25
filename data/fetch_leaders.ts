
import { gql } from "@apollo/client";
import client from "../apollo-client";
import { CardLeadersProps } from "../components/cardLarge";
import { BaseDepartmentDeptTypeChoices } from "../types/enums";
import { NormifyURL } from "../utils/normify-url";

function serialize_top_leaders(leaders:any):CardLeadersProps[]{
    return leaders.edges.map((leader:any)=>{
        return({
            ...leader.node,
            name: leader.node.fullName,
            image: NormifyURL(leader.node.avatar),
            title: leader.node.position?.name,
        })
    })
}

export const FetchTopLeaders = async() =>{
    const {data} = await client.query({
        query:gql`        
        query TopChurchLeaders{
            leaders(top:true){
              edges{
                node{
                  fullName
                  position{
                    name
                    description
                  }
                  no
                  avatar
                  excerpt
                }
              }
            }
          }
        `
    })
    const leaders:CardLeadersProps[] = serialize_top_leaders(data.leaders)
    return leaders
  }
export const FetchDepartmentLeaders = async(type:BaseDepartmentDeptTypeChoices) =>{
    const {data} = await client.query({
        query:gql`        
          query DepartmentLeaders($type:BaseDepartmentDeptTypeChoices) {
            leaders(department_DeptType: $type) {
              edges {
                node {
                  fullName
                  position {
                    name
                    description
                  }
                  no
                  avatar
                  excerpt
                }
              }
            }
          }
        `,
        variables: {
          type: type
        }
    })
    const leaders:CardLeadersProps[] = serialize_top_leaders(data.leaders)
    return leaders
  }