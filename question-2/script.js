/**
 * On this module you should write your answer to question #2.
 * This file would be executed with the following command:
 * $ node script.js BrowsingEvents.csv
 */

const args = process.argv.slice(-1);
console.log(`Running question #2 with args ${args}`)

const csv = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const fs = require('fs');

var datawrite = [];

//Creo un objeto Productos para mapear cada evento obtenido del csv de entrada a una 
//propiedad de este objeto, dependiendo del entityId / productID y así luego ir sumando
//los clicks o impresiones.
let Productos = {}

fs.createReadStream(args[0])
    .pipe(csv())
    .on('data', (row) => {
       
        //Ahora a Productos le creo una propiedad por cada entityId distinto, de esta manera
        //cuando llega un evento relacionado a un entityId que coincide con una propiedad
        //de Productos deberá sumar clicks o impressions de este productId, sino se creará
        //una nueva propiedad a Productos correspondiente a este entityId que antes no había llegado.  
        if (!Productos.hasOwnProperty(row.entityId)) {
            Productos[row.entityId] = {
                productId: row.entityId,
                clicks: 0,
                impressions: 0,
            }
        }

        //Se suman los eventos cada vez que llega un event impression o click
        if (row.eventType == "impression") {
            Productos[row.entityId].impressions++
        }
        else if (row.eventType == 'click') {
            Productos[row.entityId].clicks++
        }
    })
    .on('end', () => {
        console.log('Read CSV file successfully processed');
        // Una vez que se terminó de procesar toda la información...
        //Recorro el Productos para mapear lo que eran sus propiedades a un array de objetos llamado datawrite,
        //para que ya posea el formato que se necesita para escribir el nuevo csv.
        //Además antes, calculo el ctr (tasa de clicks) y lo agrego a cada propiedad.  
        for (const property in Productos) {
            Productos[property].ctr = Productos[property].clicks / Productos[property].impressions;
            datawrite.push(Productos[property]);
        }

        console.log("****************************************************** ");
        // llamado a la función writeCSV que escribe el csv de salida output.csv
        writeCSV(datawrite);
    });


function writeCSV(datawrite){
    const csvWriter = createCsvWriter({
        path: 'output.csv',
        header: [
          {id: 'productId', title: 'productId'},
          {id: 'clicks', title: 'clicks'},
          {id: 'impressions', title: 'impressions'},
          {id: 'ctr', title: 'ctr'},
        ]
      });
              
      csvWriter
        .writeRecords(datawrite)
        .then(()=> console.log('The CSV file was written successfully'));
}

