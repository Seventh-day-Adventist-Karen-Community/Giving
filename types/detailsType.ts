export type BeliefsType = {
    id: any,
    slug: string,
    name: string,
    category?: {
        id: string,
        slug: string,
        name: string,
    },
    mainPicture: string,
    content: string,
    sequenceNo: number,
    modified?:string,
    created?:string,
    categoryName?:string,
    canModify?:boolean|false
}

export type BeliefsCategoryType = {
    id: any,
    slug: string,
    name: string,
    beliefs: BeliefsType[]
}
export type BeliefsOnlyCategoryType = {
    id: any,
    slug: string,
    name: string,
}

export type CreateBeliefsType = {
    id: any,
    slug: string,
    name: string,
    name_error?: string,
    mainPicture: string,
    mainPictureName: string,
    mainPicture_error?: string,
    content: string,
    content_error?: string,
    sequenceNo: number,
    sequenceNo_error?: string,
    categoryName?:string,
    categoryLabel?:string,
    categoryName_error?:string,
    errored: boolean
}
