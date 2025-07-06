// QUERIES: recursos
const resourceQueries = {
    // QUERIE: 1. Obtener todos los recursos
    getAll: `
        SELECT * 
        FROM resources 
        ORDER BY date DESC;
    `,

    // QUERIE: 2. Obtener recursos públicos
    findPublic: `
        SELECT * 
        FROM resources 
        WHERE private = FALSE 
        ORDER BY date DESC;
    `,

    // QUERIE: 3. Obtener recursos por ID de usuario
    findByUserId: `
        SELECT * 
        FROM resources 
        WHERE user_id = $1 
        ORDER BY date DESC;
    `,

    // QUERIE: 4. Buscar recursos por texto en tag
    findByTag: `
        SELECT * 
        FROM resources
        WHERE EXISTS (
            SELECT 1 
            FROM unnest(tags) AS t 
            WHERE t ILIKE $1
        )
        ORDER BY date DESC;
    `,

    // QUERIE: 5. Crear recurso
    insertResource: `
        INSERT INTO resources 
        (user_id, tags, image, title, description, links, private)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *;
    `,

    // QUERIE: 6. Editar recurso por ID
    updateById: `
        UPDATE resources
        SET tags = $1,
            image = $2,
            title = $3,
            description = $4,
            links = $5,
            private = $6
        WHERE resource_id = $7
        RETURNING *;
    `,

    // QUERIE: 7. Eliminar recurso por ID
    deleteById: `
        DELETE FROM resources 
        WHERE resource_id = $1 
        RETURNING *;
    `,
};



// EXPORTS
module.exports = resourceQueries;