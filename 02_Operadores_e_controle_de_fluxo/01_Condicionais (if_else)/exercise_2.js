var people = {
     age: [45, 23, 14, 18, 17, 63],
     name: ['Marcos', 'Lucas', 'Natalia', 'Alice', 'Matias' , 'Bento']

}

function VerifyAge(arry){
    let a = people.age.length;
    let i = 0;
    while(i < a){
        if(people.age[i] < 18){
            console.log(`${people.name[i]} is not an adult.`);
        }
        else {
            console.log(`${people.name[i]} is an adult.`);
        }
        i++;
    }
}

VerifyAge(people);