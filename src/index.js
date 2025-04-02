
const express = require("express");
const path = require("path");
const https = require('https');

let t = "";
let colorAlerta = "";
const options = {
  hostname: 'www.satrp.com',
  port: 443,
  path: '/nivel',
  method: 'GET'
};

//contactos
//const contactos = require("./controllers/Contactos")

//whatsapp
const fs = require('fs');
const qrcode = require('qrcode-terminal');

const { Client, NoAuth } = require('whatsapp-web.js');

//const client = new Client({
// authStrategy: new LocalAuth(),
// puppeteer: {
//	args: ['--no-sandbox'],
 // }
//});

const client = new Client({
	authStrategy: new NoAuth(),
	puppeteer: {
        	args: ['--no-sandbox'],
	},
	webVersionCache: { type: 'remote',
			remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html', }
});
//client.initialize();


client.on('qr', qr => {
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('El cliente esta listo');
});

//client.initialize();

//mensajes
client.on('message', msg => {
  console.log(msg.body);
  if (msg.body.toUpperCase() === "NIVEL") {
    client.sendMessage(msg.from, `Nivel del río en puente El Cady: ${t}m.
${colorAlerta}
Para más detalles, envía \"info\".

---

🔧 Desarrollador:
👨‍💻 Paúl Amén`);
  } else if (msg.body.toUpperCase() === "HOLA") {
    client.sendMessage(msg.from, "Hola, aquí podrás consular el nivel del río Portoviejo en el puente El Cady. Solo envíame un mensaje con la palabra: \"Nivel\"");
  } else if (msg.body.toUpperCase() === "INFO" || msg.body.toUpperCase() === "INFORMACION" || msg.body.toUpperCase() === "NIVELES") {
    client.sendMessage(msg.from, `Nivel menor a 4: 
🟢  NO hay alerta 🟢

Nivel mayor o igual a 4 y menor 4.99: 
🟡  ALERTA AMARILLA 🟡

Nivel mayor o igual a 5 y menor a 5.80: 
🟠  ALERTA NARANJA 🟠

Nivel mayor o igual a 5.80: 
🔴 ALERTA ROJA 🔴 

🔧 Desarrollador:
👨‍💻 Paúl Amén`);
  } else {
  client.sendMessage(msg.from, `Comando desconocido, escriba la palabra \"Nivel\"

🔧 Desarrollador:
👨‍💻 Paúl Amén`);
  }
	
});

//express
let app = express();

//app.use(morgan("dev"));

app.set("views", path.join(__dirname, "views"));

/**
 * Rutas
 */
app.use(express.static(path.join(__dirname, "public")));

app.use(require("./routes"));

//ruta de pruebas



app.get("/b", function (req, res) {

  t = req.query.t;
  console.log(t);
  
  if (t < 4)
	colorAlerta = "🟢  NO hay alerta 🟢 "
  else if (t < 4.99)
	colorAlerta = "🟡  ALERTA AMARILLA 🟡 "
  else if (t < 5.8)
	colorAlerta = "🟠  ALERTA NARANJA 🟠 "
  else
	colorAlerta = "🔴 ALERTA ROJA 🔴"
//  client.sendMessage("593987229300@c.us", t);
res.send("ok"); 
});
let ultimoMensaje ="";
/** Rutas de Alertas **/
app.get("/alerta", function (req, res) {  

 
    //client.sendMessage("593987229300@c.us", `${t[1]}`);//PAUL
 
});

app.listen((port = 7100), () => {
  console.log("Servidor ejecutándose en el puerto", port);
});

client.initialize();
