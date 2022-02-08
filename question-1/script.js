/**
 * On this module you should write your answer to question #1.
 * This file would be executed with the following command (N=100):
 * $ node scritp.js 100
 */

 // importo el módulo fs para poder escribir un archivo de texto
let fs= require('fs');

const args = process.argv.slice(-1);


console.log(`Running question #1 with args ${args}`)



function subiendoEscalera(n) {
    // si la cantidad de peldaños es 0 hay 0 maneras de subir la escalera.
    // si la cantidad de peldaños es 1 hay 1 manera de subir la escalera.
    // si la cantidad de peldaños es 2 hay 2 maneras de subir la escalera.
    if (n < 3) return n;
    // en cambio si la cantidad de peldaños es 3 o más...
    let first = 1;
    let second = 2;
    for (let i = 2; i < n; i++) {  
      //cada vez que entra al for trae en first y second los resultados de la iteración
      // N-1 y N-2
      const current = first + second;
      first = second;
      second = current;
    }
    return second;
  }

function WriteFile(rta) 
{
    console.log(`ejecutando... `);
    fs.writeFile('response.txt', rta, {encoding: "utf-8"}, function(error){
        if(error) console.log(`Ocurrió un error... ${error}`);
        else console.log(`La respuesta es ${rta} y se ha escrito en el archivo response.txt`);
    });
}

let rta= subiendoEscalera(args);
console.log('Entraaaaaaaaa'+ rta);
WriteFile(rta.toString());