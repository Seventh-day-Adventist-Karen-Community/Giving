import { gql } from "@apollo/client"
import { FAQType } from "@customTypes/utilTypes"
import client from "../apollo-client"


const FAQQuery =gql`
query FAQ($id:ID!){
    faqCategory(id:$id){
      id
      slug
      name
      description
      faqSet{
        edges{
          node{
            id
            question
            sequenceNo
            answer
            created
            modified
          }
        }
      }
    }
  }
        `

const FetchFAQ = async ({id}:{id:string}) => {
  const {data, loading, error}= await client.query({
    query: FAQQuery,
    variables:{
        id:id
    }
  })
 const faqs:FAQType[]=data.faqCategory.faqSet.edges?.map((faq:any)=>{
    return({
        ...faq.node,
        title:faq.node.question,
        description:faq.node.answer
    })  
  })
  return faqs
}

export default FetchFAQ