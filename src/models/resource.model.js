// IMPORTS
const dbConnection = require('../utils/dbConnection.util');
const { dbQuery } = require('../utils/dbQuery.util')
const {
    findResourceById,
    insertResource,
    updateById,
    deleteById,
    getAll,
    findByUserId,
    findPublic,
    findByTag,
} = require('../queries/resources.queries');



// 0. Obtener recurso por ID (necesario para comprobar propiedad)
async function getResourceById(resourceId) {
  const { rows } = await dbConnection.query(findResourceById, [resourceId]);
  return rows[0];
}


// 1. Obtener todos los recursos
async function getAllResources() {
  const { rows } = await dbConnection.query(getAll);
  return rows;
}


// 2. Obtener recursos públicos
async function getPublicResources() {
  const { rows } = await dbConnection.query(findPublic);
  return rows;
}


// 3. Obtener recursos por ID de usuario
async function getResourcesByUserId(userId) {
  const { rows } = await dbConnection.query(findByUserId, [userId]);
  return rows;
}


// 4. Buscar recursos por texto tag
async function getResourcesByTag(tag) {
    if (!tag) throw new Error('Tag no proporcionado');
    
    const searchTag = `%${tag}%`; // Añadimos comodines para búsqueda "contiene"
    const result = await dbQuery(findByTag, [searchTag]);

    if (!result || !result.rows) return [];

    return result.rows;
}


// 5. Crear un nuevo recurso
async function createResource({ user_id, tags, image, title, description, links, public: ispublic }) {
    const values = [user_id, tags, image, title, description, links, ispublic];
    const result = await dbQuery(insertResource, values);
    return result.rows[0]; //Devuelve el recurso recién creado
}


// 6. Editar un recurso por ID
async function updateResourceById({ tags, image, title, description, links, public: ispublic, resource_id }) {
  const values = [tags, image, title, description, links, ispublic, resource_id];
  const result = await dbQuery(updateById, values);
  return result.rows[0] || null;
}


// 7. Eliminar recurso por ID
async function deleteResourceById(resourceId) {
  const { rows } = await dbConnection.query(deleteById, [resourceId]);
  return rows[0];
}



// EXPORTS
module.exports = {
  getResourceById,
  getAllResources,
  getResourcesByUserId,
  getPublicResources,
  getResourcesByTag,
  createResource,
  updateResourceById,
  deleteResourceById
};