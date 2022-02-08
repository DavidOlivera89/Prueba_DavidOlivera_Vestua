# Enunciado 3

> Implementar un método de verificación lógica de paréntesis. Es decir, implementar el método `parenthesisChecker(str)` que recibe un `string` como parámetro y devuelve un `boolean`. La respuesta del método debe ser `true` si la cadena de `string` es válida en términos de paréntesis (`( )`, `[ ]`, `{ }`), i.e. cada apertura de paréntesis se cierra correctamente. A continuación se muestran ejemplos de `string` válidos e inválidos.
> 
> **Ejemplos válidos**: la función debe devuelve `true`.
>
> - `parenthesisChecker('a * (b + c)')` → `true`
> - `parenthesisChecker('a * (b + c * [d])')` → `true`
> - `parenthesisChecker('[]{}()abc{([])}')` → `true`
>
> **Ejemplos válidos**: la función debe devuelve `false`.
>
> - `parenthesisChecker('(()')` → `false`
> - `parenthesisChecker('(([))')` → `false`
> - `parenthesisChecker('([)]')` → `false`

# Razonamiento

_Escribir aquí los supuestos asumidos, reflexiones y explicaciones de la solución_

Está bastante comentado el código...

La idea inicial es quitar los espacios a la cadena de entrada...
Luego recorrer la cadena buscando los parentesis, corchetes o llaves que se abren e ir poniendolos en una pila, para luego poder ir comparando en orden con los parentesis, 
corchetes o llaves de cierre que van apareciendo. 

Por ejemplo: {3 * (4 / 8)} 

Primera iteración:    {3 * (4 / 8)}                                        stack
                      i                i={      Meto { en la                {
                                                pila stack

Segunda iteración:   {3 * (4 / 8)}                                         stack
                          i            i=(      Meto ( en la                (
                                                pila                        {
                                                                                

Tercera iteración:   {3 * (4 / 8)}                                         stack
                                i      i=)      Evalúo si en                 (    <-- Sí  
                                                la cabeza de la              {
                                                la pila está (     

Entonces quiere decir que hasta ahora está correcta, saco ( de la pila y continúo:

Cuarta iteración:   {3 * (4 / 8)}                                         stack
                                i      i=}      Evalúo si en                {    <-- Sí                      la cabeza de la              
                                                la pila está {     

SÍ se encuentró { o sea que todo lo que se abrió fue cerrado y se saca de la pila. Y como la 
pila está vacía... la cadena de entrada es correcta y se devuelve true. Si algo de lo anterior hubiera fallado se devuelve false.

Luego en el código se aplicaron técnicas de programación como utilizar un objeto hash para guardar en la pila los símbolos que luego se buscarán y hacer más fácil el proceso. El código está comentado.
