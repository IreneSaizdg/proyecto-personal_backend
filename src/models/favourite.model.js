const db = require('../utils/dbConnection.util');
const queries = require('../queries/favourites.queries');

// Añadir un favorito
async function addFavourite(userId, resourceId) {
    const { rows } = await db.query(queries.addFavourite, [userId, resourceId]);
    return rows[0];
}

// Eliminar favorito por user y resource
async function deleteFavouriteByUserAndResource(userId, resourceId) {
    const { rows } = await db.query(queries.deleteFavouriteByUserAndResource, [userId, resourceId]);
    return rows[0];
}

// Obtener favoritos por userId
async function getFavouritesByUserId(userId) {
    const { rows } = await db.query(queries.getFavouritesByUserId, [userId]);
    return rows;
}

// Comprobar si ya existe favorito
async function isFavourite(userId, resourceId) {
    const { rows } = await db.query(queries.isFavourite, [userId, resourceId]);
    return rows.length > 0;
}

module.exports = {
addFavourite,
deleteFavouriteByUserAndResource,
getFavouritesByUserId,
isFavourite
};