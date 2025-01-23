function arrayByHalf(array, callback){
    for(let i = 0; i < array.length; i++){
        array[i] = callback(array[i]);
    }
    
}
const half = function(num){
    return Math.round(num / 2);
}

let array = [1,2,3,54,234,45,234,1,56,3,2];

arrayByHalf(array, half);
console.log(array); 