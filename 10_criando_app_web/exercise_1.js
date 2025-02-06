const display = document.querySelector('#display');
const addToDisplay = num => {
    if(display.textContent.length < 15){
        if(num === 'a'){
            num = '(';
        }
        let last_char = display.textContent[display.textContent.length - 1];
        if(num ==='b'){
            if(last_char === '(' || last_char === '+' || last_char === '-' ){
                let temp = display.textContent;
                display.textContent = 'escreva mais antes de ) ...';
                setTimeout(() => {
                    display.textContent = temp;
                }, 700);
                return;
            }

            num = ')';
        }
        if((num === '/' || num === '*') && last_char == '('){
            return;
        }
        if(((num === '*') || (num === '/')) && (display.textContent == '0')){
            display.textContent += num;
            return;
        }
        if(((num === '*') || (num === '/')) && (display.textContent == '')){
            return;
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
        let temp = display.textContent;
        display.textContent = 'Tamanho máximo';
        setTimeout(() => {
            display.textContent = temp;
        }, 1500);
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
                let index1 = str.search(/[*]/g);
                let index2 = str.search(/[\/]/g);
                if (index1 < index2){
                    let info = getInfo(str, index1);
                    str = `${info.string.slice(0, info.index_start)}${(Number(info.number1) * Number(info.number2)).toFixed(2)}${info.string.slice(info.index_end)}`;
                }
                else{
                    let info = getInfo(str, index2);
                    if(info.number2 == '0'){
                        return 'Dividir por zero é crime';
                    }
                    str = `${info.string.slice(0, info.index_start)}${(Number(info.number1) / Number(info.number2)).toFixed(2)}${info.string.slice(info.index_end )}`;
                }
            }
            else if(str.includes('*')){
                let index1 = str.search(/[*]/g);
                let info = getInfo(str, index1);
                str = `${info.string.slice(0, info.index_start)}${(Number(info.number1) * Number(info.number2)).toFixed(2)}${info.string.slice(info.index_end )}`;
            }
            else{
                let index2 = str.search(/[\/]/g);
                let info = getInfo(str, index2);
                if(info.number2 == '0'){
                    return 'Dividir por zero é crime';
                }
                str = `${info.string.slice(0, info.index_start)}${(Number(info.number1) / Number(info.number2)).toFixed(2)}${info.string.slice(info.index_end )}`;
            }
            
        }
        else if( (str.slice(1).includes('+')) || (str.slice(1).includes('-')) ){
            if(str.includes('+') && str.includes('-')){
                let index1 = str.slice(1).search(/[+]/g) + 1;
                let index2 = str.slice(1).search(/[\-]/g) + 1;
                if (index1 > index2){
                    let info = getInfo(str, index1);
                    str = `${info.string.slice(0, info.index_start)}${Number(info.number1) + Number(info.number2)}${info.string.slice(info.index_end + 1)}`;
                    
                }
                else{
                    let info = getInfo(str, index2);
                    str = `${info.string.slice(0, info.index_start)}${Number(info.number1) - Number(info.number2)}${info.string.slice(info.index_end + 1)}`;
                    
                }
            }
            else if(str.slice(1).includes('+')){
                let index1 = str.slice(1).search(/[+]/g) + 1;
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
    let parentheses_regex = /(\((\-?|\+?)[0-9]+((\.[0-9]+)?[\-\+*\/]?[0-9]+(\.[0-9]+)?)?\))/;
    if(parentheses_regex.test(str)){
        let parentheses_str = str.match(parentheses_regex);
        let index_a = str.search(/[(]/g);
        let index_b = str.search(/[)]/g);
        let nextindex = str.length - str.slice(index_a + 1).length;
        let nextopen = str.slice(index_a + 1).search(/[(]/g);
        let bool = ((( nextopen + nextindex ) < index_b) && nextopen !== -1);
        while( bool){
            index_a = nextindex + nextopen;
            nextindex = str.length - str.slice(index_a + 1).length;
            nextopen = str.slice(index_a + 1).search(/[(]/g);
            bool = ((( nextopen + nextindex ) < index_b) && nextopen !== -1);
            
        }
        if(index_b < index_a){
            index_b = str.slice(index_b + 1).search(/[)]/g);
            index_b += index_a - 1;
        }
        if(/[0-9)]/g.test(str[index_a - 1])){
            str = `${str.slice(0, index_a)}*${str.slice(index_a)}`;
            index_a++;
            index_b++;
        }
        let strC = str.slice(index_a + 1, index_b);
        let result = `${calculate(strC)}`;
       
        if(str[index_a - 1] === '-' && result !== '0'){
            result = `${Number(result) * (-1)}`;
            index_a--;
        }
        if(str[index_a - 1] === '+'){
            index_a--;
        } 
        if((str[index_a - 1] === '*' || str[index_a - 1] === '/' ) && Number(result) < 0){
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

}

document.querySelector('#buttons').addEventListener('click', event => {
    let str = display.textContent;
    let char = event.target.id;
    if(event.target.classList.contains('num')){
        if (char === 'b'){
            if(str.match(/[(]/g)){
                addToDisplay(char);
            }
        }
        else{
            addToDisplay(char);
        }
        
        
    }
    else if(event.target.classList.contains('op')){
        if (/[+\-\/*]/g.test(str[str.length - 1])){
            let temp = display.textContent;
            display.textContent = 'Duas operações juntas, separe com ()';
            setTimeout(() => {
                display.textContent = temp;
            }, 1500);
            
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
            if((/[+\-\/*]/g.test(str))  && !(/[+\-\/*(]/g.test(str[str.length - 1])) || /^(?=.*\().*(?=.*\)).*$/g.test(str)){
                if(  (str.match(/[(]/g) !== null)   &&   (str.match(/[)]/g) !== null )   ){
                    if( str.match(/[(]/g).length  ===  str.match(/[)]/g).length){
                        display.textContent = 'Calculando ...';
                        setTimeout(() => {
                            display.textContent = calculate(str);
                        }, 150);
                        
                    }
                }
                else if(  (str.match(/[(]/g) == null)   &&   (str.match(/[)]/g) == null )   ){
                    let temp = display.textContent;
                    display.textContent = 'Calculando ...';
                    setTimeout(() => {
                        display.textContent = calculate(str);
                    }, 150);
                }
                else{
                    let temp = display.textContent;
                    display.textContent = 'Syntax Incorrect, try again'
                    setTimeout(()=> {
                        display.textContent = temp;
                    },1500);
                }
                
            }
            else{
                let temp = display.textContent;
                    display.textContent = 'Syntax Incorrect, try again'
                    setTimeout(()=> {
                        display.textContent = temp;
                    },1500);
            }
        }
    }
});