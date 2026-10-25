export default function getObject(obj: any, key:any, value:any):object{
    var result:object = {'key':'value'}
    if(obj instanceof Array){
        for(let i=0; i<obj.length; i++){{
            result = getObject(obj[i], key, value)
            if(result)
                break
        }}
    }
    else
    {
        for(let prop in obj){
            if(prop == key){
                if(obj[prop]==value){
                    return obj
                }
            }
            if(obj[prop] instanceof Object || obj[prop] instanceof Array) {
                result = getObject(obj[prop], key, value);
                if (result) {
                    break;
                }
            }
        }
    }

    return result
}