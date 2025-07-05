// QUERIES: favoritos
const favouriteQueries = {
    // 1. Añadir un favorito (relacionar user y resource)
    addFavourite: `
        INSERT INTO favourites (user_id, resource_id)
        VALUES ($1, $2)
        RETURNING *;
    `,

    // 2. Eliminar un favorito por su id
    deleteFavouriteById: `
        DELETE FROM favourites
        WHERE favourite_id = $1
        RETURNING *;
    `,

    // 3. Eliminar un favorito por user_id y resource_id (más común)
    deleteFavouriteByUserAndResource: `
        DELETE FROM favourites
        WHERE user_id = $1 AND resource_id = $2
        RETURNING *;
    `,

    // 4. Obtener todos los favoritos de un usuario (info completa de resources)
    getFavouritesByUserId: `
        SELECT r.*
        FROM resources r
        JOIN favourites f ON r.resource_id = f.resource_id
        WHERE f.user_id = $1
        ORDER BY r.date DESC;
    `,

    // 5. Verificar si un recurso está en favoritos de un usuario (para evitar duplicados)
    isFavourite: `
        SELECT 1
        FROM favourites
        WHERE user_id = $1 AND resource_id = $2
        LIMIT 1;
    `,
};

module.exports = favouriteQueries;