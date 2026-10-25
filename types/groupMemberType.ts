export type GroupMemberType = {
    firstName: string;
    firstName_error?: string;
    lastName: string;
    lastName_error?: string;
    emailAddress: string;
    emailAddress_error?: string;
    phoneNo: string;
    phoneNo_error?: string;
    contactMethods?:string[];
    group: string;
    errored: boolean;
}
