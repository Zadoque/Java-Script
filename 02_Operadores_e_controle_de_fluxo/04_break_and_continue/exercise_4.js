let mat = [
    ['Zadoque', 'Natalia'],
    ['Heitor', 'Lara'],
    ['Emanuel', 'Luis'],
    ['Jk10', 'matusalem20']
]

for(row of mat){
    for(word of row){
        for(letter of word){
            if(letter.toLowerCase() == 'a' || letter == 'e' || letter == 'i' || letter == 'o' || letter == 'u' ){
                console.log("It's a vogal, skipping");
                continue;
            }
            if(letter >= '0' && letter <= '9'){
                console.log("It's a number, going to the next word");
                break;
            }
            console.log(letter);
        }

    }
}