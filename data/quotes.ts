import { gql } from '@apollo/client';
import client from '../apollo-client';


export const FetchQuotes = async() =>{
    const {data} = await client.query({
        query:gql`        
        query Quote {
            quotes {
              edges {
                node {
                  id
                  title
                  reference
                  content
                  created
                  modified
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
    return data.quotes.edges
  }