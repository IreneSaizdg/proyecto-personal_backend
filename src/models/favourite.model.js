const dbConnection = require('../utils/dbConnection.util');
const {
    insertFavourite,
    getFavouritesByUserId,
    deleteFavourite,
    getFavourite
} = require('../queries/favourites.queries');

// 1. Añadir un favorito
async function addFavourite({ user_id, resource_id }) {
    const { rows } = await dbConnection.query(insertFavourite, [user_id, resource_id]);
    return rows[0];
}

// 2. Obtener favoritos por userId
async function getFavouritesByUser(user_id) {
    const { rows } = await dbConnection.query(getFavouritesByUserId, [user_id]);
    return rows;
}

// 3. Eliminar favorito por user y resource
async function deleteFavouriteByUserAndResource( { user_id, resource_id } ) {
    const { rows } = await dbConnection.query(deleteFavourite, [user_id, resource_id]);
    return rows[0];
}

// 4. Comprobar si ya existe favorito
async function isFavourite({ user_id, resource_id }) {
    const { rows } = await dbConnection.query(getFavourite, [ user_id, resource_id ]);
    return rows.length > 0;
}



module.exports = {
    addFavourite,
    deleteFavouriteByUserAndResource,
    getFavouritesByUser,
    isFavourite,
};