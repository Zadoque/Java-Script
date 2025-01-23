var number1 = 16;
var number2 = -5;
var number3 = 0;
var number4 = -96;
var number5 = 156;

function negativeAndPositive(number){
    if(number > 0 ){
        return 'the number is positive\n';
    }
    else if(number < 0){
        return 'the number is negative\n';
    }
    else {
        return 'the number is zero\n';
    }
}

console.log(negativeAndPositive(number1));
console.log(negativeAndPositive(number2));
console.log(negativeAndPositive(number3));
console.log(negativeAndPositive(number4));
console.log(negativeAndPositive(number5));