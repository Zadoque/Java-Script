var time = [2];
document.querySelector('#loadData').addEventListener('click', function(event){
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Dados carregados com sucesso');
        }, 2000);
    });
    promise
    .then(result => {
        let paragraph = document.body.querySelector("#content");
        paragraph.textContent = time[0];
        time[0] += 2;
    })
    .catch(error => {
        console.log('something is wrong');
    })
    .finally(() => {
        console.log(`This will happen doesn't matter what `);
    });
});

