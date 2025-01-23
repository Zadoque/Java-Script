let mat = [
    [1,2,-3,4,-5],
    [6,7,-8,9,10],
    [27,17,-28,-19,10]
]

for(row of mat){
    for(number of row){
        if(number < 0){
            continue;
        }
        console.log(number);
    }
}