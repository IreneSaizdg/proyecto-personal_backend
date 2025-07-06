const db = require('../utils/dbConnection.util');
const queries = require('../queries/resources.queries');

// Obtener todos los recursos
async function getAllResources() {
    const { rows } = await db.query(queries.getAllResources);
    return rows;
}

// Obtener recurso por ID
async function getResourceById(resourceId) {
    const { rows } = await db.query(queries.getResourceById, [resourceId]);
    return rows[0];
}

// Crear un nuevo recurso
async function createResource(resourceData) {
    const { title, description, url, category, type, user_id } = resourceData;
    const { rows } = await db.query(queries.createResource, [title, description, url, category, type, user_id]);
    return rows[0];
}

// Actualizar recurso
async function updateResourceById(resourceId, data) {
    const { title, description, url, category, type } = data;
    const { rows } = await db.query(queries.updateResourceById, [title, description, url, category, type, resourceId]);
    return rows[0];
}

// Eliminar recurso
async function deleteResourceById(resourceId) {
    const { rows } = await db.query(queries.deleteResourceById, [resourceId]);
    return rows[0];
}

module.exports = {
    getAllResources,
    getResourceById,
    createResource,
    updateResourceById,
    deleteResourceById
};