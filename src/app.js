// IMPORTS
const express = require('express') //Importa el framework
require('dotenv').config(); //Carga las variables de entorno

const allRoutes = require('./routes/all.routes');
const app = express() //Instancia de express
const cors = require('cors'); //CORS (mw)

const port = process.env.PORT || 5000; //Configura el puerto




// MIDDLEWARES: express.json express.URLencoded -----
// MW:Parseo
app.use(express.urlencoded({ extended: true})) //Parsear datos URL-encoded (formularios HTML)
app.use(express.json()); //Parsear JSON en las peticiones

// MW:Config de las CORS
const frontUrlBase = process.env.FRONT_URL || "http://localhost:5173"
const whiteList = [frontUrlBase, "http://localhost:5000"]
app.use(cors({
    origin: whiteList //Peticiones desde dominios de la lista
}))

// MW: Logueo de peticiones entrantes
app.use((req, res, next) => {
    console.log(`➡️ ${req.method} ${req.originalUrl}`);
    next();
});

// MD: MULTER Servir archivos estáticos
app.use("/uploads", express.static("uploads")); //Esto permite acceder a imágenes o archivos subidos desde el navegador




// RUTAS ------------------------------------------ 
app.use('/api/v1', allRoutes); 



// INICIO DEL SERVIDOR ----------------------------
app.listen(port,() => {
    console.log(`Server running on port: ${port}`)
})