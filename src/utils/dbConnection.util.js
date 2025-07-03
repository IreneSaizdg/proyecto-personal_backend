// IMPORTS
const { Pool } = require('pg'); //Importa el Pool de PostgreeSQL para  gestionar conexiones
require('dotenv').config(); //carga las variables de entorno





// UTIL: Verificar si el entorno es de producción
/* Info + 
En desarrollo puedes conectarte a una BBDD local, mientras que en producción usas una externa (ej: Render)
Usar isProduction permitirá:
    - Usar credenciales distintas
    - Aplicar configuraciones específicas por entorno
    - Aumentar la seguridad en producción
    - Mejorar la experiencia de desarrollo con (console./error.)logs y feedback*/
const isProduction = process.env.NODE_ENV === 'production'


// UTIL: Instancia de Pool para conectarse a Postgre (BBDD)
/**
 * Crea una instancia de Pool para conectarse a PostgreSQL.
 * Utiliza variables de entorno para la configuración.
 * Aplica conexión segura (SSL, protocolo para encriptsar conexiones seguras) sólo si está en producción.
 */
const pool = new Pool({
    user: process.env.DB_USER,         // Usuario de la BBDD
    password: process.env.DB_PASSWORD, // Contraseña del usuario
    host: process.env.DB_HOST,         // Host de la BBDD
    port: process.env.DB_PORT,         // Puerto de conexión
    database: process.env.DB_NAME,     // Nombre de la BBDD

    /* En producción:
    Configuración de conexión segura (SSL/TLS) a una BBDD remota (PostgreSQL) en producción.
        - Si está en producción usa conexión SSL sin verificar 
        - Si está en desarrollo no usa SSL
    */
    ssl: isProduction ? { rejectUnauthorized: false } : false 
});






// EXPORTS
module.exports = pool;