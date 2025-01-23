function is_even(number){
    if(number % 2 == 0){
        return true;
    }
    else{
        return false;
    }
}

if(is_even(9)){
    console.log(`The number is even`);
}
else{
    console.log(`The number is Odd`);
}