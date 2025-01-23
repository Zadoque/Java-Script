function fibonacci(num){
    let before = 0;
    let current = 1;
    let next;
    for(let i = 0; i < num;i++){
        console.log(current);
        next = current + before;
        before = current;
        current = next;
    }
}

fibonacci(10);