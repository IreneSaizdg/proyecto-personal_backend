

const resourceQueries = {
    // 1. Crear recurso
    insertResource: `
        INSERT INTO resources 
        (user_id, tags, image, title, description, links, private)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *;
    `,

    // 2. Editar recurso por ID
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

    // 3. Eliminar recurso por ID
    deleteById: `
        DELETE FROM resources 
        WHERE resource_id = $1 
        RETURNING *;
    `,

    // 4. Obtener todos los recursos
    getAll: `
        SELECT * 
        FROM resources 
        ORDER BY date DESC;
    `,

    // 5. Obtener recursos por usuario
    findByUserId: `
        SELECT * 
        FROM resources 
        WHERE user_id = $1 
        ORDER BY date DESC;
    `,

    // 6. Obtener recursos públicos
    findPublic: `
        SELECT * 
        FROM resources 
        WHERE private = FALSE 
        ORDER BY date DESC;
    `,

    // 7. Buscar recursos por tag o tag similar
    findByTagOrTitle: `
        SELECT * 
        FROM resources
        WHERE EXISTS (
            SELECT 1 FROM unnest(tags) AS t WHERE t ILIKE $1
        )
        ORDER BY date DESC;
    `,

    // 8. Obtener recursos favoritos de un usuario
    findFavouritesByUserId: `
        SELECT r.*
        FROM resources r
        JOIN favourites f ON r.resource_id = f.resource_id
        WHERE f.user_id = $1
        ORDER BY r.date DESC;
    `,
};

module.exports = resourceQueries;