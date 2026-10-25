export type ActivityType ={
    id: string;
    no:string;
    department?:{
        id:string;
        no:string;
        title:string;
        description:string;
    }
    title:string;
    description:string;
    image?:any;
    activityType:string;
    startDate: Date;
    endDate: Date;
    slots: number;
    amount: number;
    canModify?: boolean;
}

export type CreateActivityType ={
    id: string;
    no:string;
    department?:string;
    department_Label?:string;
    department_error?:string;
    title:string;
    title_error?:string;
    description:string;
    description_error?:string;
    image?:any;
    imageName?:any;
    image_error?: string;
    activityType?:string;
    activityType_Label?:string;
    activityType_error?:string;
    startDate: Date;
    startDate_error?: string;
    endDate: Date;
    endDate_error?: string;
    slots: number;
    slots_error?: string;
    amount: number;
    amount_error?: string;
    errored: boolean;
}