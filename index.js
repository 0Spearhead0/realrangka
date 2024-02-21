const{default: makeWaSocket, useMultiFileAuthState} = require("@whiskeysockets/baileys");
const Pino = require("pino");

async function connectToWhatsapp() {
  const auth = await useMultiFileAuthState("auth");
  const socket = makeWaSocket({
    printQRInTerminal: true,
    browser: ["Bacotpedia", "Firefox", "1.0.0"],
    auth: auth.state,
    logger: Pino({ level: "silent"})
  });
  socket.ev.on("creds.update", auth.saveCreds);
  socket.ev.on("connection.update", ({connection}) => {
    if (connection === "open") console.log("terhubung");
    if(connection === "close") connectToWhatsapp();
  });
}
connectToWhatsapp();