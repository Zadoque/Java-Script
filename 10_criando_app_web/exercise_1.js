const display = document.querySelector('#display');
function messageDisplay(message, delay){
    let text = display.textContent;
    display.textContent = message;
    setTimeout(() => {
        display.textContent = text;
    }, delay);
}
const addToDisplay = (num,add_or_put = true) => {
    if(add_or_put){
        display.textContent += num;
    }
    else{
        display.textContent = num;
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
    if(/[0-9\.]/g.test(str[info.index_start])){
        while(/[0-9\.]/g.test(str[info.index_start])){
            info.number1 = `${str[info.index_start]}${info.number1}`
            info.index_start --;
        }
        info.index_start++;
    }
    while( /[0-9\.]/g.test(str[info.index_end])){
        info.number2 += `${str[info.index_end]}`;
        info.index_end++;
    }
    info.index_end--;
    if((info.index_start == 1 && str[0] === '-') || (str[info.index_start - 1] === '-' && str[info.index_start - 2] === '(' )){
        info.number1 = `${Number(info.number1) * (-1)}`
        if(info.index_start === 1){
            info.string = str.slice(1);
        }
        else{
            info.string = `${str.slice(0,info.index_start - 1)}${str.slice(info.index_start)}`;
        }
        info.index_end--;
        info.index_start--;
    }
    if(info.index_start == 1 && str[0] === '+'){
        info.string = str.slice(1);
        info.index_end--;
        info.index_start--;
    }
    return info;

}
function calculate(str){
    do{
        if(str.includes('*') || str.includes('/')){
            if(str.includes('*') && str.includes('/')){
                let index1 = str.search(/[\*]/g);
                let index2 = str.search(/[\/]/g);
                if (index1 < index2){
                    let info = getInfo(str, index1);
                    str = `${info.string.slice(0, info.index_start)}${(Number(info.number1) * Number(info.number2)).toFixed(2)}${info.string.slice(info.index_end + 1)}`;
                }
                else{
                    let info = getInfo(str, index2);
                    if(info.number2 == '0'){
                        return 'Dividir por zero é crime';
                    }
                    str = `${info.string.slice(0, info.index_start)}${(Number(info.number1) / Number(info.number2)).toFixed(2)}${info.string.slice(info.index_end + 1)}`;
                }
            }
            else if(str.includes('*')){
                let index1 = str.search(/[\*]/g);
                let info = getInfo(str, index1);
                str = `${info.string.slice(0, info.index_start)}${(Number(info.number1) * Number(info.number2)).toFixed(2)}${info.string.slice(info.index_end + 1)}`;
            }
            else{
                let index2 = str.search(/[\/]/g);
                let info = getInfo(str, index2);
                if(info.number2 == '0'){
                    return 'Dividir por zero é crime';
                }
                str = `${info.string.slice(0, info.index_start)}${(Number(info.number1) / Number(info.number2)).toFixed(2)}${info.string.slice(info.index_end + 1)}`;
            }
        }
        else if(/.*(\+?|\-?).*(\++|\-+).+/.test(str.slice(1))){
            if(/(\-{1}.*\+{1}.*)|(\+{1}.*\-{1}.*)/.test(str.slice(1))){
                let index1 = str.slice(1).search(/[\+]/g) + 1;
                let index2 = str.slice(1).search(/[\-]/g) + 1;
                if (index1 < index2){
                    let info = getInfo(str, index1);
                    str = `${info.string.slice(0, info.index_start)}${Number(info.number1) + Number(info.number2)}${info.string.slice(info.index_end + 1)}`; 
                }
                else{
                    let info = getInfo(str, index2);
                    str = `${info.string.slice(0, info.index_start)}${Number(info.number1) - Number(info.number2)}${info.string.slice(info.index_end + 1)}`;
                }
            }
            else if(str.slice(1).includes('+')){
                let index1 = str.slice(1).search(/[\+]/g) + 1;
                let info = getInfo(str, index1);
                str = `${info.string.slice(0, info.index_start)}${Number(info.number1) + Number(info.number2)}${info.string.slice(info.index_end + 1)}`;
                
            }
            else{
                let index2 = str.slice(1).search(/[\-]/g) + 1;
                let info = getInfo(str, index2);
                str = `${Number(info.number1) - Number(info.number2)}${info.string.slice(info.index_end + 1)}`;
                
            }
        }
    }while(/[\/+\-*)]/g.test(str.slice(1)));
    return str;
}

function simplify(str){
    let parentheses_regex = /(\(((\-?|\+?)[0-9]+((\.[0-9]+)?[\-\+*\/]?[0-9]+(\.[0-9]+)?)?)+\))/;
    do{
        if(parentheses_regex.test(str)){
            let parentheses_str = str.match(parentheses_regex);
            let index_a = parentheses_str.index;
            let index_b = parentheses_str[0].length + index_a - 1;
            if(/[0-9)]/g.test(str[index_a - 1])){
                str = `${str.slice(0, index_a)}*${str.slice(index_a)}`;
                index_a++;
                index_b++;
            }
            let result = `${calculate(parentheses_str[0].slice(1,parentheses_str[0].length - 1))}`;
            if(/[\+\-]/.test(str[index_a - 1]) && result !== '0'){
                if(/[\-]/.test(str[index_a - 1])){
                    result = `${Number(result) * (-1)}`;
                }
                index_a--;
            }
            if( /[\/\*]/.test(str[index_a - 1]) && Number(result) < 0){
                let new_str = `${str.slice(0, index_a)}${result.slice(1)}`;
                let info = getInfo(new_str, index_a - 1);
                if(str[index_a - 1] === '*'){
                    result = `${(Number(result) * Number(info.number1)).toFixed(2)}`;
                }
                else{
                    if(result == '0'){
                        return 'Dividir por zero é crime';
                    }
                    result = `${(Number(info.number1)  / Number(result) ).toFixed(2)}`;
                }
                str = `${info.string.slice(0, info.index_start)}${result}${str.slice(index_b + 1)}`
            }
            else{
                str = `${str.slice(0,index_a)}${result}${str.slice(index_b + 1)}`;
            }
        }
    }while(parentheses_regex.test(str));
    return str;

}
function verifyInput(str){
    if((/[\+\-\/\*]/g.test(str))  && !(/[\+\-\/\*\(]/g.test(str[str.length - 1])) ){
        if(  (str.match(/[\(]/g) !== null)   &&   (str.match(/[\)]/g) !== null )   ){
            if( str.match(/[\(]/g)[0].length  ===  str.match(/[\)]/g)[0].length){
                return true;
            }
            return false;
        }
        else if(  (str.match(/[\(]/g) == null)   &&   (str.match(/[\)]/g) == null )   ){
            return true;
        }
        else{
            return false;
        } 
    }
    else{
        return false;
    }
}
function handleNumInput(num, current_input){
    if(current_input >= 18){
        messageDisplay('Tamanho Máximo',500);
        return;
    }
    let last_char = current_input[current_input.length - 1];
    if(/[0-9]/.test(num)){
        current_input === '0' ?
        addToDisplay(num, false):
        addToDisplay(num);
        return;
    }
    if(/[0-9]/.test(last_char)&& num === '.'){
        addToDisplay(num);
        return;
    }
    if(!(/\./.test(last_char)) && num === 'a'){
        num = '(';
        current_input === '0' ?
        addToDisplay(num, false):
        addToDisplay(num);
        return;
    }
    if(num ==='b' && /\(/.test(current_input)){
        num = ')';
        if(/\)/.test(current_input)){
            let bool = (current_input.match(/\(/g).length > current_input.match(/\)/g).length);
            if(bool){
                addToDisplay(num);
            }
        }
        else{
            if(!(/[\-\+\*\/\(]/.test(last_char))){
                addToDisplay(num);
            }
            
        }
    }
}
function handleOpInput(op, current_input){
    let last_char = current_input[current_input.length - 1];
    if (/[\+\-\/\*]/g.test(last_char) ||( /[\(]/g.test(last_char) && /[\*\+]/.test(op) ) ){
        messageDisplay(`Separe ${last_char} e ${op}`,900);
     }
     else{
        if(/[\/\*]/.test(op)){
            current_input === '0'?
            messageDisplay('Comece com outra operação', 500):
            addToDisplay(op);
        }
        else{
            current_input === '0'?
            addToDisplay(op, false):
            addToDisplay(op);
        }
     }
}
function handleAction(action, str){
    if(action === 'clear'){
        display.textContent = '0';
    }
    else if (action === 'backspace' || action === 'backspace1'){
        display.textContent = str.slice(0, str.length - 1);
    }
    else{
        if(verifyInput(str)){
            addToDisplay(calculate(simplify(str)), false);
        }
        else{
            messageDisplay('Syntax Incorrect, try again',300);
        }
    }
}

document.querySelector('#buttons').addEventListener('click', event => {
    let str = display.textContent;
    let char = event.target.id;
    if(event.target.classList.contains('num')){
        handleNumInput(char, str);
    }
    else if(event.target.classList.contains('op')){
       handleOpInput(char, str);
    }
    else{
        handleAction(event.target.id,str);
    }
});