function counter() {
    var count = 0;
    return function() {
      count++;
      return count;
    };
}
   
var myCounter = counter();
console.log(myCounter()); // 1  console.log(myCounter()); // 2

/* In this code, closure is being used to protect the variable count, 
making it just increase one by one. If we had the code below, it would 
be possible to change the value  of count using debug console 
while the code is running to 1000, for example.

var count = 0;

if(condition){
    count += 1;
}


*/
