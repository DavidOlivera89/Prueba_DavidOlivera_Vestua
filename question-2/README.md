# Enunciado 2

> En la carpeta [question-2](https://bitbucket.org/vestua-com/questions/src/main/question-2/) se ha exportado eventos de navegación de usuarios anonimizados de la plataforma Vestuá. Se le pide al equipo de Ingeniería que hagan un análisis sobre los datos de navegación. En particular se solicita:
>
> - Calcular la cantidad de visitas únicas por cada producto.
> - Calcular la cantidad de clicks únicos por cada producto.
> - Calular el CTR (*Clickthrough Rate*) de cada producto.
> 
> El set de datos contiene la siguiente estructura:
> 
> - `user`: id del usuario que ejecutó el evento.
> - `entityId`: id de la entidad al que el usuario ejecutó el evento.
> - `entityType`: tipo de entidad al que se ejecutó el evento.
> - `eventType`: tipo de evento. Puede ser `impression` o `click`.
> 
> Como miembro del equipo de ingeniería, te solicitan modificar el archivo [script.js](https://bitbucket.org/vestua-com/questions/src/main/question-2/script.js) para que pueda leer el set de datos y generar un archivo `output.csv` con las siguientes columnas:
> 
> - `productId`: id del producto.
> - `clicks`: cantidad de *clicks* únicos que tiene el producto
> - `impressions`: cantidad de impresiones únicas que tiene el producto.
> - `ctr`: métrica CTR del producto.

# Razonamiento

_Escribir aquí los supuestos asumidos, reflexiones y explicaciones de la solución_

* He trabajado con el módulo csv-parser para poder leer el archivo más cómodamente, por lo cual probablemente deba instalarlo antes de revisar el código... Con el siguiente comando:

    $ npm i -s csv-parser

* Para la escritura del archivo csv de salida utilicé el módulo csv-writer por lo que también probablemente deberá instalarlo con el siguiente código:

    $ npm i -s csv-writer

* Un supuesto importante... al final cuando escribo los datos en el archivo de salida algunos productos tienen su ctr Infinito, esto se debe a la división entre un número de clicks dividido 0 impresiones, evidentemente esto es un error por lo que lo dejé de esa manera.

* EXPLICACIÓN: 

Si bien el código ya está bastante comentado, rápidamente la idea sería que al leer el archivo de entrada de cada línea leída se va clasificando en un objeto Productos, por entityId.

Si Productos ya posee un evento proveniente de ese entityId simplemente se suma si es un click o una impression, en cambio si Productos no posee una propiedad de ese entityId quiere decir que aún no llego ningún evento de esa entityId así se crea la propiedad y se suma si es un click o impression.

Una vez que todas las líneas del archivo fueron leídas y que toda la información se encuentra en el objeto Productos, se calcula para cada entityId o productId su ctr teniendo en cuenta el nro de clicks recibidos y las impresiones registradas. Luego se crea un array de objetos los cuales ya poseen la información que se solicita en el archivo csv de salida: 

{
    productoId,
    clicks,
    impressions,
    ctr
}

Luego se llama a la función que escribe el archivo de salida pasando como parámtros la cabecera y el array mencionado con la información procesada.
