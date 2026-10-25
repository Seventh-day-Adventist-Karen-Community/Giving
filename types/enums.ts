export enum BaseDepartmentDeptTypeChoices {
    KIDS="KIDS",
    YOUTH="YOUTH",
    AMO="AMO",
    AWM="AWM",
    OTHER="OTHER"
}

export enum GroupActionChoices {
    OPEN = 'OPEN',
    ACCEPT = 'ACCEPTED',
    REJECT = 'REJECTED',
    DISCONTINUE = 'DISCONTINUED'
}

export enum ActivityStatusChoices {
    OPEN = 'OPEN',
    ACTIVE = 'ACTIVE',
    CLOSED = 'CLOSED',
    ARCHIVED = 'ARCHIVED'
}

export enum StaticPagesTypeChoices{
    POLICIES = 'POLICIES',
    OTHER = 'OTHER'
}
// Today, Yesterday, This Week, Last Week, This Week-to-date, Last Week-to-date, Next Week, Next 4 Weeks, This Month, Last Month, This Month-to-date, Last Month-to-date, Next Month, This Fiscal Quarter, Last Fiscal Quarter, This Fiscal Quarter-to-date, Last Fiscal Quarter-to-date, Next Fiscal Quarter, This Fiscal Year, Last Fiscal Year, This Fiscal Year-to-date, Last Fiscal Year-to-date, Next Fiscal Year

export const GroupActionChoicesKeys = Object.keys(GroupActionChoices)
export const GroupActionChoicesValues = Object.values(GroupActionChoices)
export const ActivityStatusChoicesKeys = Object.keys(ActivityStatusChoices)
export const ActivityStatusChoicesValues = Object.values(ActivityStatusChoices)