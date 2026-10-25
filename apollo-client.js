 
import { getSession } from "@app/lib/session";
// import { ErrorLink } from "@utils/error";
import { ApolloClient, from, InMemoryCache } from "@apollo/client";
// import { GraphQLClient } from "graphql-request";
import { setContext } from '@apollo/client/link/context';
import { CSRF } from "@utils/client-constants"; 
// import createUploadLink from "apollo-upload-client/createUploadLink.mjs";

const { createUploadLink } = require('apollo-upload-client');
export const local_url = 'http://192.168.0.100:8000'
const server_url = 'https://admin.sdackc.org'
let uri=  server_url + "/graphql"
// if (process.env.NODE_ENV=='development')
//     uri =  local_url+"/graphql"

const authLink = setContext(async(_, { headers }) => {
    const session = await getSession()
    const token = session ? `JWT ${session}` : ""
    // get the authentication token from local storage if it exists
    // return the headers to the context so httpLink can read them
    return {
        headers: {
        ...headers,
        authorization: token,
        'X-CSRFToken': CSRF ? CSRF:''
        },
        next: {
        revalidate: 0
      }
    }
    });

    
// const httpLink = createHttpLink({
//     uri: uri,
//     });
const uploadLink = createUploadLink({
    uri: uri,
})



const additiveLink = from([
    // ErrorLink,
    // RetryLink,
    authLink,
    // httpLink
    uploadLink,
    ]);

const client = new ApolloClient({
    link:additiveLink,
    cache: new InMemoryCache(),
});

export default client;

// An implementation to use graphql request
// export const graphQLClient = new GraphQLClient(uri, {
// headers: {
//     authorization: token ? `Bearer ${token}` : "",
// },
// })
