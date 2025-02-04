const display = document.querySelector('#display');
const addToDisplay = num => {
    if(display.textContent.length < 15){
        if(num === 'a'){
            num = '(';
        }
        if(num ==='b'){
            num = ')';
        }
        if( num === '.'){
            display.textContent += num;
        }
        else{
            display.textContent === '0' ?
            display.textContent = num:
            display.textContent += num;
        }
    }
    else{
        console.log('Max size'); 
    }
};
function getInfo(str, index){
    let info = {
        index_start: index - 1,
        index_end:   index + 1,
        number1:  '',
        number2 : '',
        string: str,
    }
    while(/[0-9\.]/g.test(str[info.index_start])){
        info.number1 = `${str[info.index_start]}${info.number1}`
        info.index_start --;
    }
    info.index_start++;
    
    while( /[0-9\.]/g.test(str[info.index_end])){
        info.number2 += `${str[info.index_end]}`;
        info.index_end++;
    }
    info.index_end--;
    if(info.index_start == 1 && str[0] === '-'){
        info.number1 = `${Number(info.number1) * (-1)}`
        info.string = str.slice(1, str.length - 1);
        info.index_end--;
    }
    return info;

}
function calculate(string){
    let str = string;
    do{
        if(str.includes('(')){
            let index = str.search(/[*]/g);
        }
        else if(str.includes('*')){
            let index = str.search(/[*]/g);
            let info = getInfo(str, index);
            str = `${(Number(info.number1) * Number(info.number2)).toFixed(2)}${info.string.slice(info.index_end, str.length - 1)}`;
            console.log(str);
        }
        else if(str.includes('/')){
            let index = str.search(/[\/]/g);
            let info = getInfo(str, index);
            str = `${(Number(info.number1) / Number(info.number2)).toFixed(2)}${info.string.slice(info.index_end, str.length - 1)}`;
            console.log(str);
        }
        else if(str.includes('+')){
            let index = str.search(/[+]/g);
            let info = getInfo(str, index);
            str = `${Number(info.number1) + Number(info.number2)}${info.string.slice(info.index_end, str.length - 1)}`;
            console.log(str);
        }
        else if(str.includes('-')){
            let index = str.search(/[\-]/g);
            if( index == 0){ 
                index = str.slice(1, str.length).search(/[\-]/g) + 1;
            }
            let info = getInfo(str, index);
            str = `${Number(info.number1) - Number(info.number2)}${info.string.slice(info.index_end, str.length - 1)}`;
            console.log(str);
        }
    }while(/[\/+\-*]/g.test(str.slice(1, str.length - 1)));
    return str;
}

document.querySelector('#buttons').addEventListener('click', event => {
    let str = display.textContent;
    let char = event.target.id;
    if(event.target.classList.contains('num')){
        if (char === 'b'){
            if(str.includes('(')){
                addToDisplay(char);
            }
        }
        else{
            addToDisplay(char);
        }
        
        
    }
    else if(event.target.classList.contains('op')){
        if (/[+\-\/*]/g.test(str[str.length - 1])){
            console.log('The last is already an operation');
        }
        else{
            addToDisplay(event.target.id);
        }
    }
    else{
        if(event.target.id === 'clear'){
            display.textContent = '0';
        }
        else if (event.target.id === 'backspace' || event.target.id === 'backspace1'){
            let str = display.textContent;
            display.textContent = str.slice(0, str.length - 1);
        }
        else{
            if((/[+\-\/*]/g.test(str))  && !(/[+\-\/*(]/g.test(str[str.length - 1]))){
                console.log("Let's calculate");
                display.textContent = calculate(str);
            }
            else{
                console.log('Nothing to do');
            }
        }
    }
});