/**
 * On this module you should write your answer to question #3.
 * This file would be executed with the following command:
 * $ node script.js 'a * (b + c)'
 */

const args = process.argv.slice(-1);
console.log(`Running question #3 with args ${args}`);

/**
 * Check if a string has correct use of parenthesis.
 *
 * @param {String} str - String to be evaluated
 * @returns {Boolean} Returns true if string is valid.
 */

function parenthesisChecker(s) {
  // TODO: Implement validation logic

  //Primero almaceno en una variable str los caracteres de la cadena de entrada sin espacios en blanco
  var str = s.toString().split(" ").join("");
  //Declaro un vector stack que utilizaré como una pila
  const stack = [];
  //Declaro este objeto hash que me sirve para transformar un caracter de entrada en uno de salida,
  //así cuando recibo por ejemplo un ( obtengo automáticamente un ) que utilizaré más adelante.
  const hash = {
    "(": ")",
    "{": "}",
    "[": "]"
  };

  //Recorremos la cadena de entrada sin espacios
  for (let i = 0; i < str.length; i++) {
    //Si recibo un carácter de apertura de paréntesis, corchete o llave obtengo su correspondiente 
    // de cierre según el objeto hash comentado anteriormente y lo almaceno en 
    // la pila stack (estructura LIFO, last in first out) 
    if (str[i] === "(" || str[i] === "{" || str[i] === "[") {
      stack.push(hash[str[i]]);
      continue;
    }

    // Si recibo un carácter de cierre de paréntesis, corchete o llave directamente lo busco
    // en la pila, ya que debe encontrarse el mismo en la cabeza de la pila... sino ya estamos
    // seguros de que no cumple con el formato buscado, ya que se cierra algo que no ha sido
    // abierto
    if (str[i] === ")" || str[i] === "}" || str[i] === "]") {
      const requiredElement = stack.pop();
      if (str[i] !== requiredElement) return false;
    }

  }

  //Si al finalizar de recorrer la cadena str, la pila stack se encuentra vacía entonces, quiere 
  //decir que todo lo que fue abierto se cerró y se devuelve true, o sea que la cadena cumple
  // con lo buscado.
  //En caso contrario si la pila aún no está vacía quiere decir que algo que se abrió en la 
  //cadena no ha sido cerrado. Entonces devuelve false.
  if (stack.length > 0) {
    return false;
  } else return true;
}

const isValid = parenthesisChecker(args);
console.log(`parenthesisChecker("${args}") = ${isValid}`);
