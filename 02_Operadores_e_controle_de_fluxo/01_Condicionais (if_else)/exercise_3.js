/*
- Cold: below 15
- Pleasant: 15 to 25
- Warm: 26 to 35
- Very Warm: above 35
*/
function VerifyTemp(number){
    if(number < 15){
        console.log(`It's cold outside`);
    }
    else if(number < 26){
        console.log(`It's Pleasent outside`);
    }
    else if(number < 36){
        console.log(`It's warm outside`);
    }
    else{
        console.log(`It's very warm outside`);
    }
}
VerifyTemp(6);
VerifyTemp(24);
VerifyTemp(30);
VerifyTemp(36);