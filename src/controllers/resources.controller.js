// IMPORT
const {
  createResource,
  updateResourceById,
  deleteResourceById,
  getAllResources,
  getResourceById,
  getResourcesByUserId,
  getPublicResources,
  searchResources,
  getFavouritesByUserId
} = require('../models/resource.model');


// CONTROLLER: 1. Crear recurso
const createResourceController = async (req, res) => {
  try {
    const newResource = await createResource(req.body);
    res.status(201).json(newResource);
  } catch (error) {
    console.error('Error al crear recurso:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// CONTROLLER: 2. Editar recurso por ID
const updateResourceByIdController = async (req, res) => {
  try {
    const updated = await updateResourceById(req.params.resource_id, req.body);
    if (!updated) {
      return res.status(404).json({ message: 'Recurso no encontrado' });
    }
    res.status(200).json(updated);
  } catch (error) {
    console.error('Error al actualizar recurso:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// CONTROLLER: 3. Eliminar recurso por ID
const deleteResourceByIdController = async (req, res) => {
  try {
    const deleted = await deleteResourceById(req.params.resource_id);
    if (!deleted) {
      return res.status(404).json({ message: 'Recurso no encontrado' });
    }
    res.status(200).json({ message: 'Recurso eliminado', resource: deleted });
  } catch (error) {
    console.error('Error al eliminar recurso:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// CONTROLLER: 4. Obtener todos los recursos
const getAllResourcesController = async (_req, res) => {
  try {
    const resources = await getAllResources();
    res.status(200).json(resources);
  } catch (error) {
    console.error('Error al obtener recursos:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// CONTROLLER: 5. Obtener recursos por ID de usuario
const getResourcesByUserIdController = async (req, res) => {
  try {
    const resources = await getResourcesByUserId(req.params.user_id);
    res.status(200).json(resources);
  } catch (error) {
    console.error('Error al obtener recursos por usuario:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// CONTROLLER: 6. Obtener recursos públicos
const getPublicResourcesController = async (_req, res) => {
  try {
    const resources = await getPublicResources();
    res.status(200).json(resources);
  } catch (error) {
    console.error('Error al obtener recursos públicos:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// CONTROLLER: 7. Buscar recursos por tag o título
const searchResourcesController = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ message: 'El parámetro query es obligatorio' });
    }

    const results = await searchResources(query);
    res.status(200).json(results);
  } catch (error) {
    console.error('Error al buscar recursos:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// CONTROLLER: 8. Obtener favoritos de un usuario
const getFavouritesByUserIdController = async (req, res) => {
  try {
    const favourites = await getFavouritesByUserId(req.params.user_id);
    res.status(200).json(favourites);
  } catch (error) {
    console.error('Error al obtener favoritos:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};


//EXPORTS
module.exports = {
  createResourceController,
  updateResourceByIdController,
  deleteResourceByIdController,
  getAllResourcesController,
  getResourcesByUserIdController,
  getPublicResourcesController,
  searchResourcesController,
  getFavouritesByUserIdController,
};
