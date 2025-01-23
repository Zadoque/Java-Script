// to see the result, run node exercise_4.js in terminal inside the folder
var prompt = require('syncprompt');
console.log(`Lets play a game. You have to guess a number from 0 to 100 \n I'll let you know if your `)

do{
    var answer = prompt('Please enter your input: ');
    console.log('You entered: ' + answer);
    if(answer < 22){
        console.log(` the number is more than ${answer}`)
    }
    else if(answer > 22){
        console.log(`The number less than ${answer}`)
    }
    else{
        console.log(`Congratulations! You gessed the number!`)
    }

} while(answer != 22)


