export function arrToObject(arr){
    const obj = {};
    for( const data of arr){
        obj[data["name"]] = data["value"]
    }
    return obj;
}
