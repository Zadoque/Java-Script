function MultipleMat(m1, m2,i1,j1,i2,j2){
    let matresult = [];
    if(j1 != i2){
        console.log("It's not possible multiple this matrixis");
        return;
    }
    for(let i = 0; i < i1; i++ ){
        matresult.push([]);
    }
    for(let i = 0; i < i1; i++ ){
        for(let j = 0; j < j2; j++){
            let result = 0;
            for(let k = 0; k < j1; k++){
                result += m1[i][k] * m2[k][j];
            }
            matresult[i].splice(j,0,result);
        }
    }
    for(row of matresult){
        console.log(row);
    }
    return matresult;
}

function transpost(matrix, rows, cols){
    let matresult = []
    for(let i = 0; i < cols; i++){
        matresult.push([]);
    }
    for(let i = 0; i < rows; i++){
        for(let j = 0; j < cols; j++){
            matresult[j].splice(i,0,matrix[i][j]);
        }
    }
    for(row of matresult){
        console.log(row);
    }

}

const rows1 = 3;
const cols1 = 4;
const rows2 = 4;
const cols2 = 2;

const mat1 = Array.from({ length: rows1 }, () => 
    Array.from({ length: cols1 }, () => Math.floor(Math.random() * 10)) // Random number between 0 and 99
);
const mat2 = Array.from({ length: rows2 }, () => 
    Array.from({ length: cols2 }, () => Math.floor(Math.random() * 10)) // Random number between 0 and 99
);
console.log('This is matrix number one:');
for(row of mat1){
    console.log(row);
}
console.log('This is matrix number one:');
for(row of mat2){
    console.log(row);
}
console.log('This is matrix result one:');
let matresult = MultipleMat(mat1, mat2,rows1,cols1,rows2,cols2);
console.log("This is the transpost");
transpost(matresult, rows1,cols2);

