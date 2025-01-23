let array = [1,2,3,54,234,45,234,1,56,3,2];

for(let i = 0; i < array.length; i++){
    for(let j = i+1; j < array.length; j++){
        if(array[i] == array[j]){
            console.log("There is a duplicate here:");
        }
    }
}

