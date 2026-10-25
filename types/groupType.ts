import { Option } from "../components/utils/select/components/type";

export type GroupType = {
    no:string;
    id:string;
    title: string;
    location: string;
    details: string;
    description: string;
    days: string;
    time: string;
    routine: string;
    image?: string;
    currImage?: string;
    color: string;
    category: string;
    ageGroup: string;
    ageGroups?: string;
    communityTypes?: string;
    communityType?: any,
    kidsAllowed?: boolean;
    meetingDays: any;
    modified?:string,
    created?:string
    canModify:boolean | false
    leaders?:{
        fullName:string
    }[]
    links?:{
        title:string,
        link: string
    }[]
}

export type ContactMethod = {
    id: string;
    name: string;
    preference?: string;
}

export enum StatusChoices {
    OPEN = 'OPEN',
    ACCEPTED = 'ACCEPTED',
    REJECTED = 'REJECTED',
    DISCONTINUED = 'DISCONTINUED'
}

export enum RoutineChoices{
    DAILY= 'Daily',
    WEEKLY= 'Weekly',
    BIWEEKLY= 'BiWeekly',
    MONTHLY='Monthly',
    QUARTERLY='Quarterly',
    YEARLY='Yearly'
}

const RoutineChoicesKeys = Object.keys(RoutineChoices)
const RoutineChoicesLabels = Object.values(RoutineChoices)
export const RoutineChoicesObject = RoutineChoicesKeys.map(choice=>{
    let index = RoutineChoicesKeys.indexOf(choice);
    return({
        value: choice,
        label: RoutineChoicesLabels[index]
    })
})

export enum GroupCommunityTypesCategory{
    ADULT = 'ADULT',
    CHILDREN ='CHILDREN',
    BOTH ='BOTH'
}

export interface CommunityType{
    name:string;
    id:string;
    description:string;
    category:string;
    color:string;
    sequenceNo: number;
}

export interface AgeGroup{
    name:string;
    id:string;
    description:string;
}
export type CreateGroupType = {
    id:string;
    name: string;
    name_error?: string;
    location: string;
    location_error?: string;
    meetingTime: string;
    meetingTime_error?: string;
    routine: string;
    routineLabel: string;
    routine_error?: string;
    communityType: string;
    communityTypeLabel: string;
    communityType_error?: string;
    ageGroup: string;
    ageGroupLabel: string;
    ageGroup_error?: string;    
    details: string;
    details_error?: string;    
    description: string;
    description_error?: string;
    meetingDays: Option[];
    meetingDaysList: string[];
    meetingDays_error?: string; 
    image?: any,
    imageName?: any,
    image_error?:string,    
    errored: boolean;
}