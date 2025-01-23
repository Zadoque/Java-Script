if(true){
   var prop = 'year';
}

let carro = { 
    make: 'Toyota',
    model: 'corolla',
    [prop]:'' ,

    mostrar(){
        console.log(`The make of the car is ${this.make} and its model is ${this.model} and its ${prop} is ${this[prop]}`);
    }
}

carro[prop] = '2015';
console.log(carro.mostrar());