// IMPORT
const dbQuery = require('../config/db');
const resourceQueries = require('../queries/resourceQueries');


// CONTROLLER: 1. Crear recurso
const createResource = async (req, res) => {
  try {
    const { user_id, tags, image, title, description, links, private: isPrivate } = req.body;

    if (!user_id || !tags || !title) {
      return res.status(400).json({ message: 'user_id, tags y title son obligatorios' });
    }

    const result = await dbQuery(resourceQueries.insertResource, [
      user_id,
      tags,
      image || null,
      title,
      description || null,
      links || null,
      isPrivate || false,
    ]);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error al crear recurso:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// CONTROLLER: 2. Editar recurso por ID
const updateResourceById = async (req, res) => {
  try {
    const { resource_id } = req.params;
    const { tags, image, title, description, links, private: isPrivate } = req.body;

    const result = await dbQuery(resourceQueries.updateById, [
      tags,
      image || null,
      title,
      description || null,
      links || null,
      isPrivate || false,
      resource_id,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Recurso no encontrado' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error al actualizar recurso:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// CONTROLLER: 3. Eliminar recurso por ID
const deleteResourceById = async (req, res) => {
  try {
    const { resource_id } = req.params;

    const result = await dbQuery(resourceQueries.deleteById, [resource_id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Recurso no encontrado' });
    }

    res.status(200).json({ message: 'Recurso eliminado', resource: result.rows[0] });
  } catch (error) {
    console.error('Error al eliminar recurso:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// CONTROLLER: 4. Obtener todos los recursos
const getAllResources = async (req, res) => {
  try {
    const result = await dbQuery(resourceQueries.getAll);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error al obtener recursos:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// CONTROLLER: 5. Obtener recursos por ID de usuario
const getResourcesByUserId = async (req, res) => {
  try {
    const { user_id } = req.params;
    const result = await dbQuery(resourceQueries.findByUserId, [user_id]);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error al obtener recursos por usuario:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// CONTROLLER: 6. Obtener recursos públicos
const getPublicResources = async (req, res) => {
  try {
    const result = await dbQuery(resourceQueries.findPublic);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error al obtener recursos públicos:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// CONTROLLER: 7. Buscar recursos por tag o título
const searchResources = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ message: 'El parámetro query es obligatorio' });
    }

    const result = await dbQuery(resourceQueries.findByTagOrTitle, [`%${query}%`]);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error al buscar recursos:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// CONTROLLER: 8. Obtener favoritos de un usuario
const getFavouritesByUserId = async (req, res) => {
  try {
    const { user_id } = req.params;
    const result = await dbQuery(resourceQueries.findFavouritesByUserId, [user_id]);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error al obtener favoritos:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};


//EXPORTS
module.exports = {
  createResource,
  updateResourceById,
  deleteResourceById,
  getAllResources,
  getResourcesByUserId,
  getPublicResources,
  searchResources,
  getFavouritesByUserId,
};
