export const FormatCarriages = (text:string) =>{
return(text.replace("\r",'').replace("\n",'<br/>'))
}