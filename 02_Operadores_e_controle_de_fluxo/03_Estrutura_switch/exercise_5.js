var prompt = require('syncprompt');
var prompt1 = require('syncprompt');
console.log(`Let's say you are gonna book a hotel`);
console.log (`Your options are:`);
console.log ('Grain hotel: 1 \nGreen Villagy Hotel: 2 \nSpire Home Hotel: 3');

do{
    var answer = prompt('Enter the number of the Hotel of your choice : ');
    switch(answer){
        case '1':
            console.log('The Grain Hotel has three plans for you:');
            console.log('Basic plan: 1\n Modest plan: 2\n Premiun plan: 3');
            do{
                var answer1 = prompt('Enter the number of the plan of your choice : ');
                switch (answer1){
                    case 1:
                        console.log('Congrats, you have the basic plan in Grain Hotel');
                        break;
                    case 2:
                        console.log('Congrats, you have the Modest plan in Grain Hotel');
                        break;
                    case 3:
                        console.log('Congrats, you have the premiun plan in Grain Hotel');
                        break;
                    default:
                        console.log('This plan option is not valid; please try again');
                        break;
                }
            }while(!(answer1 == 1 || answer1 == 2 || answer1 == 3));
            break;
        case '2':
            console.log('The Green Villagy Hotel has three plans for you:');
            console.log('Familly plan: 1\ncouple plan: 2 \nPlus plan: 3');
            do{
                var answer1 = prompt('Enter the number of your choice : ');
                switch (answer1){
                    case '1':
                        console.log('Congrats, you have the Familly plan inGreen Villagy Hotel');
                        break;
                    case '2':
                        console.log('Congrats, you have the couple plan in Green Villagy Hotel');
                        break;
                    case '3':
                        console.log('Congrats, you have the Plus plan in Green Villagy Hotel');
                        break;
                    default:
                        console.log('This option is not valid; please try again');
                        break;
                }
            }while(!(answer == 1 || answer == 2 || answer == 3));
            break;
        case '3':
            console.log('The Spire Home Hotel has three plans for you:');
            console.log('Economic plan: 1 \nFlexible plan: 2 \nParty plan: 3');
            do{
                var answer1 = prompt('Enter the number of your choice : ');
                switch (answer1){
                    case '1':
                        console.log('Congrats, you have the Economic plan in Spire Home Hotel');
                        break;
                    case '2':
                        console.log('Congrats, you have the Flexible plan in Spire Home Hotel');
                        break;
                    case '3':
                        console.log('Congrats, you have the Party plan in Spire Home Hotel');
                        break;
                    default:
                        console.log('This option is not valid; please try again');
                        break;
                }
            }while(!(answer == 1 || answer == 2 || answer == 3));
            break;
        default:
            console.log('This hotel option is not valid; please try again');
            break;
    }
}while(!(answer == 1 || answer == 2 || answer == 3));


