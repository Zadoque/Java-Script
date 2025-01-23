var number = 187;

if(number == '187'){
    console.log("It's true when you use just two equals; it's flexible");
}

if(!(number === '187')){
    console.log("But it's false when you use three equals, cause it also checks if the types are the same");
}

switch(number){
    case '187':
        console.log("This one won't execute once the type is different");
        break;
    case 187:
        console.log("This one will happen once the types match");
        break;
    default:
        console.log("The value isn't any of the options above");

}