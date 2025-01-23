function testeHoisting(){
    //console.log(school) //variable does not exist
    console.log(curso) //variable undefined
    var curso = 'matemática'
    console.log(curso) //variable undefined
    
}


function exemploHoisting(){
    iniciar()
} 
iniciar()
function iniciar(){
    console.log('function iniciar \n')
}
testeHoisting()

