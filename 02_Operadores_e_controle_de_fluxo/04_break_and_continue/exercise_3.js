const rows = 10;
const cols = 10;

const matrix = Array.from({ length: rows }, () => 
    Array.from({ length: cols }, () => Math.floor(Math.random() * 100)) // Random number between 0 and 99
);


for(row of matrix){
    for(number of row){
        if(number == 56){
            console.log('you won!');
            continue;
        }
        if( number < 10){
            console.log('You lose some numbers');
            break;
        }
        console.log(number);
    }
}
