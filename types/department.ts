export type DepartmentsType ={
    id: string;
    no:string;
    main: boolean;
    parent?:{
        id:string;
        no:string;
        title:string;
        description:string;
    }
    title:string;
    description:string;
    image?:any;
    deptType:string;
    canModify?: boolean|false;
    leaders?:{
        fullName:string,
        position: string,
        id: string,
    }[]
}

export type CreateDepartmentsType ={
    id: string;
    no:string;
    main: boolean;
    title:string;
    title_error?:string;
    description:string;
    description_error?:string;
    image?:any;
    imageName?:any;
    image_error?: string;
    deptType:string;
    deptType_Label:string;
    deptType_error?:string;
    parent?:string;
    errored:boolean;
}


export type LeaderDepartmentType = {
    id:string,
    no:string,
    fullName:string
    departments?: {
        id:string,
        title:string,
        position: {
            code:string,
            name:string;
            description:string;
            sequenceNo:number;
        }
        department: {
            id:string;
            no:string;
            main:string;
            title:string;
            description:string;
            image:string;
            deptType:string;
            canModify?:boolean|false;
        }
    }[]
}

export enum DepartmentTypeChoices{
    KIDS = 'KIDS',
    YOUTH = 'YOUTH',
    AMO = 'AMO',
    AWM = 'AWM',
    OTHER = 'OTHER',
}

const DepartmentTypeChoicesKeys = Object.keys(DepartmentTypeChoices)
const DepartmentTypeChoicesLabels = Object.values(DepartmentTypeChoices)
export const DepartmentTypeChoicesObject = DepartmentTypeChoicesKeys.map(choice=>{
    let index = DepartmentTypeChoicesKeys.indexOf(choice);
    return({
        value: choice,
        label: DepartmentTypeChoicesLabels[index]
    })
})