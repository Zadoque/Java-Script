const display = document.querySelector('#display');
const addToDisplay = num => {
    if(display.textContent.length < 15){
        if(num === 'a'){
            num = '(';
        }
        if(num ==='b'){
            if(display.textContent[display.textContent.length - 1] === '('){
                console.log('abriu e fechou sem nada dentro');
                return;
            }

            num = ')';
        }
        if((num === '/' || num === '*') && display.textContent[display.textContent.length - 1] == '('){
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
    if(/[0-9\.]/g.test(str[info.index_start])){
        while(/[0-9\.]/g.test(str[info.index_start])){
            info.number1 = `${str[info.index_start]}${info.number1}`
            info.index_start --;
        }
        info.index_start++;
    }
    else{
        console.log('something went wrong');
        return;
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
        if(str.includes('(')){
            let index_a = str.search(/[(]/g);
            let index_b = str.search(/[)]/g);
            let acc = 0;
            let str1 = str;
            if(str1.slice(index_a + 1).includes('(')){
                while(str1.includes('(')){
                    index_a = str1.search(/[(]/g);
                    str1 = `${str1.slice(0, index_a)}${str1.slice(index_a + 1)}`;
                    index_a += acc;
                    acc++;
                }
                if(index_b < index_a){
                    index_b = str.slice(index_b + 1).search(/[)]/g);
                    console.log(str.slice(index_b + 1));
                    index_b += index_a - 1;
                }
            }

            if(/[0-9)]/g.test(str[index_a - 1])){
                str = `${str.slice(0, index_a)}*${str.slice(index_a)}`;
                console.log('here');
                index_a++;
                index_b++;
            }
            
            let result = `${calculate(str.slice(index_a + 1, index_b))}`
           
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

            
            console.log(str);
            

        }
        else if(str.includes('*') || str.includes('/')){
            if(str.includes('*') && str.includes('/')){
                let index1 = str.search(/[*]/g);
                let index2 = str.search(/[\/]/g);
                if (index1 > index2){
                    let info = getInfo(str, index1);
                    str = `${info.string.slice(0, info.index_start)}${(Number(info.number1) * Number(info.number2)).toFixed(2)}${info.string.slice(info.index_end, str.length - 1)}`;
                    console.log(str);
                }
                else{
                    let info = getInfo(str, index2);
                    if(info.number2 == '0'){
                        return 'Dividir por zero é crime';
                    }
                    str = `${info.string.slice(0, info.index_start)}${(Number(info.number1) / Number(info.number2)).toFixed(2)}${info.string.slice(info.index_end, str.length - 1)}`;
                    console.log(str);
                }
            }
            else if(str.includes('*')){
                let index1 = str.search(/[*]/g);
                let info = getInfo(str, index1);
                str = `${info.string.slice(0, info.index_start)}${(Number(info.number1) * Number(info.number2)).toFixed(2)}${info.string.slice(info.index_end, str.length - 1)}`;
                console.log(str);
            }
            else{
                let index2 = str.search(/[\/]/g);
                let info = getInfo(str, index2);
                if(info.number2 == '0'){
                    return 'Dividir por zero é crime';
                }
                str = `${(Number(info.number1) / Number(info.number2)).toFixed(2)}${info.string.slice(info.index_end, str.length - 1)}`;
                console.log(str);
            }
            
        }
        else if( (str.slice(1).includes('+')) || (str.slice(1).includes('-')) ){
            if(str.includes('+') && str.includes('-')){
                let index1 = str.slice(1).search(/[+]/g) + 1;
                let index2 = str.slice(1).search(/[\-]/g) + 1;
                if (index1 > index2){
                    let info = getInfo(str, index1);
                    str = `${info.string.slice(0, info.index_start)}${Number(info.number1) + Number(info.number2)}${info.string.slice(info.index_end + 1)}`;
                    console.log(str);
                }
                else{
                    let info = getInfo(str, index2);
                    str = `${info.string.slice(0, info.index_start)}${Number(info.number1) - Number(info.number2)}${info.string.slice(info.index_end + 1)}`;
                    console.log(str);
                }
            }
            else if(str.slice(1).includes('+')){
                let index1 = str.slice(1).search(/[+]/g) + 1;
                let info = getInfo(str, index1);
                str = `${info.string.slice(0, info.index_start)}${Number(info.number1) + Number(info.number2)}${info.string.slice(info.index_end + 1)}`;
                console.log(str);
            }
            else{
                let index2 = str.slice(1).search(/[\-]/g) + 1;
                let info = getInfo(str, index2);
                str = `${Number(info.number1) - Number(info.number2)}${info.string.slice(info.index_end + 1)}`;
                console.log(str);
            }
        }
            
              
    }while(/[\/+\-*)]/g.test(str.slice(1)));
    return str;
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
                if(  (str.match(/[(]/g) !== null)   &&   (str.match(/[)]/g) !== null )   ){
                    if( str.match(/[(]/g).length  ===  str.match(/[)]/g).length   ){
                        console.log("Let's calculate from here");
                        display.textContent = calculate(str);
                    }
                }
                else if(  (str.match(/[(]/g) == null)   &&   (str.match(/[)]/g) == null )   ){
                    console.log("Let's calculate");
                    display.textContent = calculate(str);
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