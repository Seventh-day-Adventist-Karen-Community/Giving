export type MeType = {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    lastLogin: Date;
    dateJoined: Date;
    isStaff: boolean;
    setup:MeSetupType,
    leader?:{
        id:string;
        no:string;
        firstName:string;
        lastName:string;
        middleName: string;
        email: string;
        avatar: string;
        title: string;
        position:{
          atomic:boolean;
          description: string;
          code:string;
          name: string;
        }        
      }
}

export type MeSetupType = {
  isActivityAdmin: Boolean | false;
  isAnalyticAdmin: Boolean | false;
  memberNumber: string;
  phoneNumber: string;
  address: string;
  avatar: string;
}
