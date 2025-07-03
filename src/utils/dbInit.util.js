// IMPORTS
const { dbQuery } = require("./dbQuery.util")
const bcrypt = require("bcryptjs");



//UTIL: reiniciar e inicializar BBDD (con datos por defecto)
const dbInit = async () => {
    try {
        //1. Borrar tablas en orden seguro
        await dbQuery(`DROP TABLE IF EXISTS favourites CASCADE;`); //CASCADE borra relaciones entre tablas (dependecias)
        await dbQuery(`DROP TABLE IF EXISTS resources CASCADE;`);
        await dbQuery(`DROP TABLE IF EXISTS users CASCADE;`);

        // 2. Crear tabla users
        await dbQuery(`
            CREATE TABLE IF NOT EXISTS users (
                user_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                name TEXT UNIQUE NOT NULL,
                email TEXT NOT NULL,
                password TEXT NOT NULL,
                role TEXT NOT NULL,
                privileges TEXT
            );
        `)
        
        // 3. Crear tabla resources
        await dbQuery(`
            CREATE TABLE IF NOT EXISTS resources (
                resource_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
                tags TEXT[] NOT NULL,
                image TEXT,
                title TEXT NOT NULL,
                description TEXT,
                links TEXT[],
                private BOOLEAN DEFAULT FALSE,
                date TIMESTAMP DEFAULT NOW()
            );
        `);    

        // 4. Crear tabla favourites
        await dbQuery(`
            CREATE TABLE IF NOT EXISTS favourites(
                favourite_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
                resource_id INT REFERENCES resources(resource_id) ON DELETE CASCADE
            );
        `);

        // 5. Hashear contraseñas y insertar usuarios
        const passwordUser0 = await bcrypt.hash('user0Pass123', 10);
        const passwordAdmin0 = await bcrypt.hash('admin0Pass123', 10);


        // 6. Insertar recursos
            //Insertar Usuarios:
        const resUsers = await dbQuery(`
            INSERT INTO users (name, email, password, role, privileges)
                VALUES 
                    ('User0', 'user0@email.com', $1, 'user', true),
                    ('Admin0', 'admin0@email.com', $2, 'admin', true)
                RETURNING user_id;`
        , [passwordUser0, passwordAdmin0]);
        
        const user0Id = resUsers.rows[0].user_id; // User0
        const admin0Id = resUsers.rows[1].user_id; // Admin0

            //Insertar Recursos:
        const resResources = await dbQuery(`
            INSERT INTO resources (user_id, image, tags, title, description, links, private)
                VALUES
                    ($1, 'default.png', ARRAY['testing','image'], 'Title Card 1', 'Description of card 1 for testing', ARRAY['https://nodejs.org'], false),
                    ($1, 'default.png', ARRAY['testing'], 'Title Card 2', 'Description of card 2 for testing', ARRAY['https://expressjs.com'], true),
                    ($1, 'default.png', ARRAY['testing','image'], 'Title Card 3', 'Description of card 3 for testing', ARRAY['https://nodejs.org'], false),
                    ($1, 'default.png', ARRAY['testing'], 'Title Card 4', 'Description of card 4 for testing', ARRAY['https://expressjs.com'], true),
                    ($1, 'default.png', ARRAY['testing','image'], 'Title Card 5', 'Description of card 5 for testing', ARRAY['https://nodejs.org'], false),
                    ($1, 'default.png', ARRAY['testing'], 'Title Card 6', 'Description of card 6 for testing', ARRAY['https://expressjs.com'], true)
                RETURNING resource_id;`
        , [user0Id]);

        const resourceId1 = resResources.rows[0].resource_id; //Guarda el id retorneado para después asociarlo con favoritos
        const resourceId2 = resResources.rows[1].resource_id;

            //Insertar favoritos:
        await dbQuery(`
            INSERT INTO favourites (user_id, resource_id) 
                VALUES
                ($1, $2),
                ($1, $3);`
        , [user0Id, resourceId1, resourceId2]);

        console.log("Base de datos reiniciada con éxito");


    } catch (error) {
        console.log("Error al inicializar la base de datos:", error);
    }
}



//INVOCACIÓN:
dbInit()