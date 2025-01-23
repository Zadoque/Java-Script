for (var i = 0; i < 5; i++) {
    setTimeout(function () {
      console.log(i); 
    }, i * 1);
}

/* this common error is due not only to the var scope of var variable,
but also to the behaivor of setTimeOut function. This function is 
asynchronous. So, when set timeout is about to run, the loop already finish,
 wich means the variable i is 5.

However, when you use let instead of var, which has block scope, the i value 
is one for each loop. Because of that, you see 0, 1, 2, 3, 4 in console.

*/