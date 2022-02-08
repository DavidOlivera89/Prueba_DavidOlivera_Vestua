# Enunciado 1

> Estás subiendo una escalera de N peldaños. En cada momento, puedes subir 1 o 2 peldaños. ¿En cuántas formas diferentes puedes subir las escalera?

# Razonamiento

_Escribir aquí el razonamiento al puzzle_

Es conocido que este problema de subir la escalera presenta un patrón que se ajusta a la sucesión de Fibonacci, es decir que para una escalera de N escalones, existen Fibonacci(N+1) maneras distintas de subirla.

Ejemplo:
 Primeramente asumo que para una escalera de cero escalones, existen 0 formas de subir. Luego:

 para una escalera de 1 escalon es claro que existe sólo una forma de subirla:
   1°) es de a 1 escalon.

        1 escalon = 1 metodo de subir
        Fibonacci(1+1)= 1

 para una escalera de 2 escalones es posible subirla de 2 formas distinas:
   1°) con 2 pasos de a 1 escalon
   2°) 1 paso de 2 escalones

        2 escalones = 2 metodos de subir
        Fibonacci(2+1)= 2
 
 para una escalera de 3 escalones es posible subir de 3 manereas distintas:
    1°) con 1 paso de 1 escalon y uno de 2
    2°) primero el de 2 y luego el de 1
    3°) con 3 pasos de 1 escalon  

        3 escalones = 3 metodos de subir
        Fibonacci(3+1) = 3

para una escalera de 4 escalones es posible subir de 5 manereas distintas:
    1°) con 4 pasos de 1 escalon
    2°) con 2 pasos de 2 escalones
    3°) primero un paso de 2 escalones y luego 2 pasos de 1 escalon
    4°) primero un paso de 1 escalon, luego uno de 2 escalones y luego uno de 1 escalon.
    5°) primero 2 pasos de 1 escalon y luego un paso de 2 escalones. 

        4 escalones = 5 metodos de subir
        Fibonacci(4+1) = 5

para una escalera de 5 escalones es posible subir de 8 maneras distintas:
    1°) con 5 pasos de 1 escalon
    2°) con 2 pasos de 2 escalones y luego un paso de 1 escalon
    3°) primero un paso de 2 escalones, luego un paso de 1 escalon y luego un paso de 2 escalones
    4°) primero un paso de 1 escalon, luego dos pasos de de 2 escalones.
    5°) primero un paso de 2 escalones y tres pasos de 1 escalon
    6°) primero un paso de 1 escalon, luego un paso de 2 escalones y luego dos pasos de 1 escalon
    7°) primero dos pasos de 1 escalon, luego un paso de 2 escalones y luego un paso de 1 escalon
    8°) primero 3 pasos de 1 escalon y luego un paso de 2 escalones.

        5 escalones = 8 metodos de subir
        Fibonacci(5+1) = 8

Así sucesivamente...

Como dije anteriormente se ajusta a la sucesión de Fibonacci. La sucesión de Fibonacci se puede expresar como una función matemáticamente de la siguiente manera:

  Cuando X = 0 --> F(X0) = 0
  Cuando X = 1 --> F(X1) = 1
  Cuando X = 2 --> F(X2) = 1

  Sino             F(Xn) = F(X n-1) + F(X n-2)

  
  Entonces:       Fibonacci(0) = 0
                  Fibonacci(1) = 0 + 1 = 1  -------- 
                  Fibonacci(2) = 1 + 1 = 1   ==>    1 escalon ==   Fibonacci(1+1)
                  Fibonacci(3) = 1 + 1 = 2   ==>    2 escalones == Fibonacci(2+1)
                  Fibonacci(4) = 2 + 1 = 3   ==>    3 escalones == Fibonacci(3+1)
                  Fibonacci(5) = 3 + 2 = 5   ==>    4 escalones == Fibonacci(4+1)
                  Fibonacci(6) = 5 + 3 = 8   ==>    5 escalones == Fibonacci(5+1)
    
==>    0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55...

Finalmente la función en javascript para fibonacci recursiva podría ser: 

function Fibonacci(i){
    if(i==3){
        return 2;
    }else if(i==1 || i==2){
        return 1;
    }else if(i==0){
        return 0;
    }else{
        return Fibonacci(i-1)+ Fibonacci(i-2);
    }
}

Luego de algunos ajustes me di cuenta además que para N grandes como N=100 que se pide en el ejercicio, la función es demasiada pesada (para los recursos de mi máquina al menos).

Así que desistí de hacerlo recursivamente y utilizé un for para el cálculo. 
Además se realizaron algunos ajustes para que efectivamente responda a la cantidad de formas distintas de subir una escalera dado el número N de peldaños.
De esta manera el código resultante es:

        function subiendoEscalera(n) {
            // si la cantidad de peldaños es 0 hay 0 maneras de subir la escalera.
            // si la cantidad de peldaños es 1 hay 1 manera de subir la escalera.
            // si la cantidad de peldaños es 2 hay 2 maneras de subir la escalera.

            if (n < 3) return n;

             // en cambio si la cantidad de peldaños es 3 o más...
            let first = 1;
            let second = 2;
            for (let i = 2; i < n; i++) {  
                //cada vez que entra al for tengo en first y second los 
                //resultados de la iteración N-2 y N-1 
                const current = first + second;
                first = second;
                second = current;
            }
            return second;
        }

Además se utilicé el módulo fs para crear un archivo de texto, con la siguiente función:

        function WriteFile(rta) 
        {
            console.log(`ejecutando... `);
            fs.writeFile('response.txt', rta, {encoding: "utf-8"}, function(error){
                if(error) console.log(`Ocurrió un error... ${error}`);
                else console.log(`La respuesta es ${rta} y se ha escrito en el archivo response.txt`);
            });
        }

Además se escribe por consola el resultado y la generación del archivo en el caso de que haya salido con éxito... en el caso contrario, si ocurre algún error también se mostrará en consola.


