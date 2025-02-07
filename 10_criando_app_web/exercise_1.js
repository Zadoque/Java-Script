const display = document.querySelector('#display');
function messageDisplay(message, delay){
    let text = display.textContent;
    display.textContent = message;
    setTimeout(() => {
        display.textContent = text;
    }, delay);
}
const addToDisplay = (num, add_or_put = true) => {
    if(add_or_put){
        display.textContent += num;
    }
    else{
        display.textContent = num;
    }
};

function setOrConcat(num, current_input){
    current_input === '0' ?
    addToDisplay(num, false):
    addToDisplay(num);
}

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
    while( /[0-9\.]/g.test(str[info.index_end])){
        info.number2 += `${str[info.index_end]}`;
        info.index_end++;
    }
    info.index_start++;
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
    let times_and_division_regex = /[\+\-]?[0-9]+(\.[0-9]+)?[\*\/]{1}[\-\+]?[0-9]+(\.[0-9]+)?/;
    let plus_and_minus_regex = /[\+\-]?[0-9]+(\.[0-9]+)?[\+\-]{1}[\-\+]?[0-9]+(\.[0-9]+)?/;
    while(times_and_division_regex.test(str)){
        let op_str = str.match(times_and_division_regex);
        let bool = false;
        let index = op_str[0].search(/[\*\/]/);
        let index_start = op_str.index;
        let index_end = op_str[0].length + index_start - 1;
        if(/[\+\-]/.test(op_str[0][index + 1])){
            if(op_str[0][index + 1] == '-'){
                bool = true;
            }
            op_str[0] = `${op_str[0].slice(0, index + 1)}${op_str[0].slice(index + 2)}`;
        }
        let info = getInfo(op_str[0], index);
        index_start -= info.index_start;
        if(bool){
            info.number2 *= (-1);
        }
        let result = 0;
        if(/[\/]/.test(op_str[0])){
            if(Number(info.number2) == 0){
                return 'Error! Divisão por 0';
            }
            else{
                 result = (Number(info.number1) / Number(info.number2)).toFixed(2);
            }
        }
        else{
             result = (Number(info.number1) * Number(info.number2)).toFixed(2)
        }
        if(Number(info.number1) < 0 && result > 0){
            str = `${str.slice(0, index_start)}+${result}${str.slice(index_end + 1)}`;
        }
        else{
            str = `${str.slice(0, index_start)}${result}${str.slice(index_end + 1)}`;
        }
    }
    while(plus_and_minus_regex.test(str)){
        let op_str = str.match(plus_and_minus_regex);
        let bool = false;
        let index = op_str[0].slice(1).search(/[\+\-]/) + 1;
        let index_start = op_str.index;
        let index_end = op_str[0].length + index_start - 1;
        if(/[\+\-]/.test(op_str[0][index + 1])){
            if(op_str[0][index + 1] == '-'){
                bool = true;
            }
            op_str[0] = `${op_str[0].slice(0, index + 1)}${op_str[0].slice(index + 2)}`;
        }
        let info = getInfo(op_str[0], index);
        if(bool){
            info.number2 *= (-1);
        }

        let result = 0;
        if(/[\+]/.test(op_str[0].slice(1))){
            result = Number(info.number1) + Number(info.number2);
        }
        else{
             result = Number(info.number1) - Number(info.number2);
        }
        str = `${str.slice(0, index_start)}${result}${str.slice(index_end + 1)}`;
    }
    return str;
}

function simplify(str){
    let parentheses_regex = /\(([\-+\*\/]{0,2}[0-9]+(\.[0-9]+)?)+\)/;
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
            str = `${str.slice(0,index_a)}${result}${str.slice(index_b + 1)}`;
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
function canAddParetheses(num, current_input){
    let last_char = current_input[current_input.length - 1];
    if(num ==='b' && /\(/.test(current_input)){
        if(/\)/.test(current_input)){
            let bool = (current_input.match(/\(/g).length > current_input.match(/\)/g).length);
            if(bool){
                return true;
            }
        }
        else{
            if(!(/[\-\+\*\/\(]/.test(last_char))){
                return true;
            }
        }
    }
    return false;
}

function handleNumInput(num, current_input){
    let last_char = current_input[current_input.length - 1];
    if(current_input >= 18){
        messageDisplay('Tamanho Máximo',500);
        return;
    }
    if(/[0-9]/.test(num)){
        setOrConcat( num, current_input);
        return;
    }
    if(/[0-9]/.test(last_char) && num === '.' && !(/^.*[0-9]+\.[0-9]*$/.test(current_input))){
        addToDisplay(num, current_input);
        return;
    }
    if(!(/\./.test(last_char)) && num === 'a'){
        num = '(';
        setOrConcat(num, current_input);
        return;
    }
    if(canAddParetheses(num, current_input)){
        num = ')';
        setOrConcat(num, current_input);
        return;
    }
    messageDisplay('Syntax Error', 300);
}
function handleOpInput(op, current_input){
    let last_char = current_input[current_input.length - 1];
    if (/[\+\-\/\*]/g.test(last_char) ||( /[\(]/g.test(last_char) && /[\*\+]/.test(op) ) ){
        messageDisplay(`Separe ${last_char} e ${op}`,900);
     }
     else{
        if(/[\/\*]/.test(op)){
            if(current_input === '0' || current_input === ''){
                messageDisplay('Comece com outra operação', 500);
            }
            else{
                addToDisplay(op);
            }
        }
        else{
            setOrConcat(op, current_input);
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
            messageDisplay('Syntax Error',300);
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