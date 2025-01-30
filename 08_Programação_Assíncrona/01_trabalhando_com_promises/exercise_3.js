document.querySelector('#loadData1').addEventListener('click',  function (event) {
    const promise = new Promise((resolve, reject) => {
        resolve({message: 'Dados carregados com then', targ: event.target})
    });
    
    promise
        .then(({message,targ}) => {
            console.log(message);
            let str = `${message} e vou executar mais uma promise`;
            targ.innerText = 'Descarregar';
            return new Promise((resolve, reject) => {
                setTimeout(() =>{
                    document.querySelector('#content').innerText = str;
                }, 2000);
            });
        });
});

document.querySelector('#loadData2').addEventListener('click', async function (event) {
    try {
        result = await new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve('Dados carregados em async')
            },2000);
        });
            
        
    }
    catch (error){

    }
});