
const fs = require('fs');
const managerData = function(error, data){
        if (error) {
          console.error(error);
          return;
        }
        console.log(data);
}

fs.readFile('arquivo.txt', 'utf8', managerData);