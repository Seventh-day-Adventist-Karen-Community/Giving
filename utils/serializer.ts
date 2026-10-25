import { GraphQLErrors } from "@apollo/client/errors";

export const SerializeError = (errors?:GraphQLErrors) =>{
    if (errors){
        errors.map(error=>{
            return(error.message)
        })
    }
}