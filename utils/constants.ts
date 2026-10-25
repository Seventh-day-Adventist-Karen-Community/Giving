export const Constants = {
    USE_SERVER_API: true,
    GIVING_URL: '/give-now/mpesa',
    ECOMMERCE_URL:'/departments/store',
    STUDIO_URL:'https://tv.sdackc.org',
    REVALIDATE_SECONDS: 3600, // 1 hour
    TOAST_TIMEOUT: 8000,
    IMAGE_BASE_URL: 'https://hilmus-tutor.s3.af-south-1.amazonaws.com'
}
const month_names= ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const month_names_short= ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export const FormatFriendlyDate = (date:Date)=>{
    let startDateString = date.getFullYear()+ "-" + ("0"+(date.getMonth()+1)).slice(-2) +'-'+ ("0" + date.getDate()).slice(-2) 
    return(startDateString)
}
export const FormatFriendlyDateTime = (date:Date)=>{
    let startDateTimeString = date.getFullYear()+ "-" + ("0"+(date.getMonth()+1)).slice(-2) +'-'+ ("0" + date.getDate()).slice(-2) + 'T' + ('0'+ date.getHours()).slice(-2) + ':' + ('0'+ date.getMinutes()).slice(-2) + ':' + ('0'+ date.getSeconds()).slice(-2)
    return(startDateTimeString)
}

export const FormatHumanFriendlyDate = (date:Date, short:boolean)=>{
    let startDateString = ("0" + date.getDate()).slice(-2) +' ' + month_names[date.getMonth()] + ' ' + date.getFullYear()
    if(short)
        startDateString = ("0" + date.getDate()).slice(-2) +' ' + month_names_short[date.getMonth()] + ' ' + date.getFullYear()
    return(startDateString)
}
