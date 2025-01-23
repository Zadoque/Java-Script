function showPriceOfFruits(fruit){
    switch(fruit){
        case 'apple':
            console.log(`The Apple price  is: 10.00`);
            break;
        case 'banana':
            console.log(`The banana price is: 5.00`);
            break;
        case 'Peach':
            console.log(`The Peach price is: 12.00`);
            break;
        case 'Pomegranate':
            console.log(`The Pomegranate price is: 16.00`);
            break;
        case 'Orange':
            console.log(`The Orange price is: 8.00`);
            break;
        default:
            console.log(`The fruit you entered is unknown`);
    }
}

let fruits = ['banana', 'apple', 'Peach', 'Pomegranate', 'Orange']
for( fruit of fruits){
    showPriceOfFruits(fruit);
}