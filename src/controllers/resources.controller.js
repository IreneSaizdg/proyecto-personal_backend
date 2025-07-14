// IMPORT
const {
  getResourceById,
  getAllResources,
  getResourcesByUserId,
  getPublicResources,
  getResourcesByTag,
  createResource,
  updateResourceById,
  deleteResourceById,
} = require('../models/resource.model');


// CONTROLLER: 0. Obtener recurso por id
const getResourceByIdController = async (_req, res) => {
  try {
    const { resource_id } = _req.params; //Extraemos el id de la ruta
    const resource = await getResourceById(resource_id);
    if (!resource) {
      return res.status(404).json({ message: 'Recurso no encontrado' });
    }
    res.status(200).json(resource);
  } catch (error) {
    console.error('Error al obtener recurso:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// CONTROLLER: 1. Obtener todos los recursos
const getAllResourcesController = async (_req, res) => {
  try {
    const resources = await getAllResources();
    res.status(200).json(resources);
  } catch (error) {
    console.error('Error al obtener recursos:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// CONTROLLER: 2. Obtener recursos públicos
const getPublicResourcesController = async (_req, res) => {
  try {
    const resources = await getPublicResources();
    res.status(200).json(resources);
  } catch (error) {
    console.error('Error al obtener recursos públicos:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// CONTROLLER: 3. Obtener recursos por ID de usuario
const getResourcesByUserIdController = async (req, res) => {
  try {
    const resources = await getResourcesByUserId(req.params.user_id);
    res.status(200).json(resources);
  } catch (error) {
    console.error('Error al obtener recursos por usuario:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// CONTROLLER: 4. Buscar recursos por tag
const searchResourcesByTagController = async (req, res) => {
  try {
    const { tag } = req.params;

    if (!tag) {
      return res.status(400).json({ message: 'El parámetro "tag" es obligatorio' });
    }

    const resources = await getResourcesByTag(tag);

    if (resources.length === 0) {
      return res.status(404).json({ message: 'No se encontraron recursos con ese tag' });
    }

    res.status(200).json(resources);

  } catch (error) {
    console.error('Error al buscar recursos por tag:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// CONTROLLER: 5. Crear nuevo recurso
const createResourceController = async (req, res) => {
  try {
    const newResource = await createResource(req.body);
    res.status(201).json(newResource);

  } catch (error) {
    console.error('Error al crear recurso:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// CONTROLLER: 6. Editar recurso por ID
const updateResourceByIdController = async (req, res) => {
  try {
    const resource_id = Number(req.params.resource_id);
    if (isNaN(resource_id)) {
      return res.status(400).json({ ok: false, error: "ID de recurso inválido" });
    }

    const { tags, image, title, description, links, private: isPrivate, } = req.body;

    const updatedResource = await updateResourceById({
      resource_id, tags, image, title, description, links, private: isPrivate,
    });

    if (!updatedResource) {
      return res.status(404).json({
        ok: false,
        error: "Recurso no encontrado o no actualizado",
      });
    }

    res.status(200).json({
      ok: true,
      data: updatedResource,
    });

  } catch (error) {
    console.error("Error en updateResourceByIdController:", error);
    res.status(500).json({
      ok: false,
      error: "Error interno al actualizar el recurso.",
    });
  }
};

// CONTROLLER: 7. Eliminar recurso por ID
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



//EXPORTS
module.exports = {
  getResourceByIdController,
  createResourceController,
  updateResourceByIdController,
  deleteResourceByIdController,
  getAllResourcesController,
  getResourcesByUserIdController,
  getPublicResourcesController,
  searchResourcesByTagController,
};
