'use server'

import { gql } from '@apollo/client'
import client from '../apollo-client'
import { AnalyticType } from '../types/analytic'
import { PaginationQueryType } from '../types/paginationType'

const PostWebVisitMutation = gql`
    mutation CreatePageVisits($siteName:String, $siteUrl:String!, $clientIp:String, $latitude:Float, $longitude:Float, $clientBrowser:String, $device:String, $identity: String)
    {
        createPageVisit(input:{siteName:$siteName, siteUrl:$siteUrl, clientIp: $clientIp, latitude:$latitude, longitude:$longitude, clientBrowser:$clientBrowser, device:$device, identity:$identity})
        {
            pageVisit{
            id
            siteName
            siteUrl
            sitePath
            latitude
            longitude
            domain
            }
        }
    }
    `
const PostCookieConsentMutation = gql`
    mutation PostCookieConsent($cookie:String!, $consented:Boolean!){
      createCookieConsent(input:{cookie:$cookie, consented:$consented}){
        cookieConsent{
          id
          consented
        }
      }
  }
`

const PostWebVisit = async (information:{siteName: string,siteUrl:string, clientIp: string, latitude: number, longitude: number, clientBrowser: string, device:string, identity:string}) => {
    // console.log(information)
    const {data, errors} = await client.mutate({
        variables:{
            ...information
        },
        mutation: PostWebVisitMutation
    })
    
return
}

export default PostWebVisit

const pageVisitQuery = gql`            
  query PageVisits($first: Int, $after: String, $before: String, $last: Int, $offset: Int, $date: DateTime, $dateRange: [DateTime]){
    totalAnalytic
    totalDistinctVisits
    pageVisits(first:$first, after:$after, before:$before, last:$last, offset: $offset, datetime:$date, datetime_Range: $dateRange){
      edges{
        node
        {
          id
          domain
          device
          latitude
          longitude
          sitePath
          longitude
          datetime
          siteUrl
          clientIp
          siteName
          clientBrowser
          user{
            id
            username
          }
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

export const FetchAnalytic = async ({pagination, dateFilter}:{pagination:PaginationQueryType, dateFilter?:string[]}) => {
  // console.log('Fetching')
        const {data, errors, loading} = await client.query({
            query: pageVisitQuery,
            variables:{
                first: pagination.first,
                last: pagination.last,
                after: pagination.after,
                before: pagination.before,
                offset: pagination.offset,
                dateRange: dateFilter        
            }
        })
        let analytic:AnalyticType[] = data.pageVisits.edges.map((pageVisit:any)=>{
            return({
                ...pageVisit.node,
                datetime: new Date(pageVisit.node.datetime).toLocaleString()
            })
        })
        // console.log(data.pageVisits.pageInfo)
        let pageInfo = data.pageVisits.pageInfo
    return {analytic:analytic,distinct:data.totalDistinctVisits, total: data.totalAnalytic, pageInfo: pageInfo, loading: loading}
}

export const PostCookieConsent = async (information:{cookie: string,consented:boolean}) => {
  // console.log(information)
  const {data, errors} = await client.mutate({
      variables:{
          ...information
      },
      mutation: PostCookieConsentMutation
  })
  
return
}
