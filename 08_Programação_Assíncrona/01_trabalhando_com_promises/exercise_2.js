document.querySelector('#loadData').addEventListener('click', async function (event) {
    try{
        const promise = await new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve('Dados carregados com sucesso');
            }, 2000);
        });
        document.querySelector('#content').innerText = promise;
    }
    catch(error){
        document.querySelector('#content').innerText = 'falha';
    }
    
});