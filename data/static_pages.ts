import { gql } from "@apollo/client"
import client from "../apollo-client"
import { StaticPagesTypeChoices } from "../types/enums"
import { StaticPageType } from "../types/staticPages"


const staticPagesQuery =gql`
            query StaticPages($type:SetupStaticPagesTypeChoices, $slug:String){
                staticPages(type:$type, slug:$slug, published:true){
                    edges{
                        node{
                            id
                            slug
                            name
                            content
                            background
                            sequenceNo
                            modifiedAt
                        }
                    }
                }
            }
        `

const StaticPages = async ({type, slug}:{type:StaticPagesTypeChoices, slug?:string}) => {
  const {data, loading, error}= await client.query({
    query: staticPagesQuery,
    variables:{
        type:type,
        slug:slug
    }
  })
 const static_pages:StaticPageType[]=data.staticPages.edges?.map((staticPage:any)=>{
    return({
        ...staticPage.node,
        modifiedAt: new Date(staticPage.node.modifiedAt)
    })
  })
  return static_pages
}

export default StaticPages