import { ListItem } from "../components/carousel";

interface action {
    id?: number | string,
    primary?: boolean,
    text: string,
    path: string,
}
export interface actions extends Array<action>{}
export interface SectionContent {
id: number | string,
sequenceNo: number,
bgImage?: any,
bgImageRight?: any,
bgImageLeft?: any,
title: string,
message: string,
reverse: boolean,
image?: any,
actions: actions,
bg_dark: boolean
carousel?: ListItem[],
center: boolean;
indent: boolean;
isCountdown: boolean,
CountDownTo?: Date | string| number,
startDate?: Date,
endDate?: Date
}

export interface MainCarouselContent {
    bgImage:string, 
    title:string, 
    image:string, 
    description:string,
    sequenceNo: number,
    id:string,
    dark:boolean;
    justify: 'A_0'|'A_1'|'A_2'
}

