import express from "express";  // 1 importamos express desde la libreria
import { engine } from "express-handlebars"; // 2 importamos el motor de plantillas
import viewsRouter from "./routes/views.router.js";
import productsRouter from "./routes/products.router.js";
import http from "http";
import { Server } from "socket.io";


const app = express(); // 3creamos variable para contener la funcionalidad de expresss para poder levantar nuestro servidor
const server = http.createServer(app);

const io = new Server (server);

//handlebars config
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");


app.use(express.static("public")); //4indicamos la carpeta publica para los archivos estaticos
//enpoints
app.use("/", viewsRouter);
app.use("/api/products", productsRouter);


const products = [];


//websocket


io.on("connection", (socket) => {
    console.log("Nuevo cliente conectado");
    socket.emit("productsHistory", products);

    //emitimos un evento desde el server al cliente
    socket.emit("mensaje", {greeting :"Bienvenido al servidor"});

    socket.on("new product", (data) => {
        products.push(data);
        
        io.emit("productslist", data);
    });


});

server.listen(8085, () =>{
    console.log("Servidor escuchando en el puerto 8085");
});