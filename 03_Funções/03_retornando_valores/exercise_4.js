const sumArray = function(array){
    let sum = 0;
    for(let i = 0; i < array.length; i++){
        sum += array[i];
    }
    return sum;
}

let array = [1,2,3,54,234,45,234,1,56,3,2];

let sum = sumArray(array);
console.log(sum);