import * as fs from "fs";
import { yarg } from "./config/plugins/yargs.plugin";

const { b: base, l: limit, s: showTable } = yarg;
const folderPath: string = `outputs`;
const path: string = `${folderPath}/tabla-${base}.txt`;
const headerMessage: string = `
=============================================
               Tabla del ${base}              
=============================================\n     
`;
let outputMessage: string = "";

//Creacion de Directorio
fs.mkdirSync(folderPath, { recursive: true });
//Si no existe el archivo lo crea vacio, Si existe lo limpia y lo deja vacio
fs.writeFileSync(path, headerMessage);

for (let index = 1; index <= limit; index++) {
  outputMessage += `${base} x ${index} = ${base * index}\n`;
}
outputMessage = headerMessage + outputMessage;

if (showTable) {
  console.log(outputMessage);
}

fs.writeFileSync(path, outputMessage);
console.log("File created!");
