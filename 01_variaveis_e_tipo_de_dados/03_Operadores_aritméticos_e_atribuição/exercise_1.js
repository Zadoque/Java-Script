 function quadratic_func(x) {
    return Math.pow(x,2); 
}

function quadratic_equation(a, b, c){
    let delta = Math.pow(b,2) - (4 * a * c);
    if(delta < 0 ){
         let roots = `There is not Real roots for that equation`;
        return roots; 
    }
    else{
        let x1 = ((-b + Math.sqrt(delta)) / 2 * a);
        let x2 = ((-b - Math.sqrt(delta)) / 2 * a);
        let roots = [x1, x2];
        return roots;
    }
    
}

let roots = quadratic_equation(1,5,6);
console.log(roots)

let caluclate = 6;

console.log(quadratic_func(caluclate));