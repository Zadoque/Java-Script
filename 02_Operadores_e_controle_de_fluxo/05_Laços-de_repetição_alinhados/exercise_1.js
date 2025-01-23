for(let i = 9; i > 0; i--){
    let linha = ''
    for(let j = i; j < 10; j++){
        linha += '*'
    }
    console.log(linha);
}
var count = 1;
var height = 25;
var width = ( (2 * height) - 1);
var first_space = Math.floor(width /2);
for(let i = 0; i < height; i++){
    let linha = '';
    for(let j = i; j < first_space; j++){
        linha += ' ';
    }
    for(let k = 0; k < count; k++){
        linha += '*';
    }
    for(let j = i; j < first_space; j++){
        linha += ' ';
    }
    count += 2; // number of '*' increase by two for the next line
    console.log(linha);
}