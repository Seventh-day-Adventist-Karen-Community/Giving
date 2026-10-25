export  type PaginationType = {
    hasNextPage:boolean,
    hasPreviousPage:boolean,
    startCursor:string,
    endCursor:string
}


export type PaginationQueryType={
    first?:number, last?:number, after?: string, before?:string, offset?:string
}