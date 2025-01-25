export function lower(str : string) : string{

    let finalStr = "";

    for(let i=0;i<str.length;i++){
        if(str[i]>='A' && str[i]<='Z'){
            finalStr+=str[i].toLowerCase();
        }
        else{
            finalStr+=str[i];
        }
    }

    return finalStr;
}