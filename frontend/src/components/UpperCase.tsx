export default function UpperCase(word : string){

    let actualWord = "";
    const tempWord = word.split(' ')

    for(let i=0;i<tempWord.length;i++){
        const tempWord2=tempWord[i];
        if(tempWord2[0]>='a' && tempWord2[0]<='z'){
            actualWord+=tempWord2[0].toUpperCase();
        }
        else{
            actualWord+=tempWord2[0];
        }
        for(let j=1;j<tempWord2.length;j++){
            if(tempWord2[j]>='A' && tempWord2[j]<='Z'){
                actualWord+=tempWord2[j].toLowerCase();
            }
            else{
                actualWord+=tempWord2[j];
            }
        }
        actualWord+=" ";
    }
    return actualWord;
}