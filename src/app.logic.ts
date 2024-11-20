import * as fs from "fs";

const base = 5;
const folderPath: string = `outputs`;
const path: string = `${folderPath}/tabla-${base}.txt`;
const headerMessage: string = `
=============================================
               Tabla del ${base}              
=============================================\n     
`;
let outputMessage: string = "";

//Header inicial
console.log(headerMessage);

//Creacion de Directorio
fs.mkdirSync(folderPath, { recursive: true });
//Si no existe el archivo lo crea vacio, Si existe lo limpia y lo deja vacio
fs.writeFileSync(path, headerMessage);

for (let index = 1; index <= 10; index++) {
  outputMessage += `${base} x ${index} = ${base * index}\n`;
}
outputMessage = headerMessage + outputMessage;
console.log(outputMessage);
fs.writeFileSync(path, outputMessage);
