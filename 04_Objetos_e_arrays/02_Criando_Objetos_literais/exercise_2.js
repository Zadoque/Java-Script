let person = {
    age : '17',
    name: 'Keven',

    change_age: function(new_age){  
        this.age = new_age;
    }
}
/* I learn the i can also write:
    change_age(new_age){  
        this.age = new_age;
    }
          as if person were a class
        */
console.log("Logging all the object at once: ");
console.log(person);
console.log("Logging the object property by property using for let in: ")
for(let property in person){
    console.log(`${property} : ${person[property]}`);
}
console.log("changing person's age:");

person['change_age'](25);
console.log(person.age);