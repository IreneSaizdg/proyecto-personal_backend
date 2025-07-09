// IMPORTS
const {
  addFavourite,
  deleteFavouriteByUserAndResource,
  getFavouritesByUser,
  isFavourite,
} = require("../models/favourite.model");



// CONTROLLER: 1. Añadir un favorito (user_id + resource_id)
const addFavouriteController = async (req, res) => {
  try {
    const user_id = Number(req.user?.user_id); // Asumiendo que usas auth con JWT
    const { resource_id } = req.body;

    if (isNaN(user_id) || isNaN(resource_id)) {
      return res.status(400).json({ ok: false, error: 'Datos inválidos' });
    }

    const alreadyFav = await isFavourite({ user_id, resource_id });
    if (alreadyFav) {
      return res.status(409).json({ ok: false, error: 'El recurso ya está en favoritos' });
    }

    const newFavourite = await addFavourite({ user_id, resource_id });

    res.status(201).json({ ok: true, data: newFavourite });
  } catch (error) {
    console.error('Error al añadir favorito:', error);
    res.status(500).json({ ok: false, error: 'Error al añadir favorito' });
  }
};


// CONTROLLER: 2. Obtener todos los favoritos de un usuario
const getFavouritesByUserIdController = async (req, res) => {
  const { user_id } = req.params;

  try {
    const favourites = await getFavouritesByUser(user_id);

    return res.status(200).json({
      success: true,
      message: "Favoritos obtenidos correctamente",
      data: favourites,
    });
  } catch (error) {
    console.error("Error al obtener favoritos del usuario:", error);
    return res.status(500).json({
      success: false,
      message: "Hubo un error al obtener los favoritos",
    });
  }
};

// CONTROLLER: 3. Eliminar un favorito por su ID
const deleteFavouriteByIdController = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedFavourite = await deleteFavouriteById(id);

    if (!deletedFavourite) {
      return res.status(404).json({
        success: false,
        message: "Favorito no encontrado para eliminar",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Favorito eliminado correctamente",
    });
  } catch (error) {
    console.error("Error al eliminar favorito por ID:", error);
    return res.status(500).json({
      success: false,
      message: "Hubo un error al eliminar el favorito",
    });
  }
};

// CONTROLLER: 3. Eliminar favorito por user_id y resource_id
const deleteFavouriteByUserAndResourceController = async (req, res) => {
  const { user_id, resource_id } = req.body;

  try {
    const deletedFavourite = await deleteFavouriteByUserAndResource(user_id, resource_id);

    if (!deletedFavourite) {
      return res.status(404).json({
        success: false,
        message: "Favorito no encontrado con esos datos",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Favorito eliminado correctamente",
    });
  } catch (error) {
    console.error("Error al eliminar favorito:", error);
    return res.status(500).json({
      success: false,
      message: "Hubo un error al eliminar el favorito",
    });
  }
};


// CONTROLLER: 4. Comprobar si un recurso está en favoritos de un usuario
const isFavouriteController = async (req, res) => {
  const { user_id, resource_id } = req.params;

  try {
    const exists = await isFavourite(user_id, resource_id);

    return res.status(200).json({
      success: true,
      message: exists
        ? "El recurso está en favoritos"
        : "El recurso no está en favoritos",
      data: exists,
    });
  } catch (error) {
    console.error("Error al comprobar favorito:", error);
    return res.status(500).json({
      success: false,
      message: "Hubo un error al comprobar el favorito",
    });
  }
};



// EXPORTS
module.exports = {
  addFavouriteController,
  deleteFavouriteByIdController,
  deleteFavouriteByUserAndResourceController,
  getFavouritesByUserIdController,
  isFavouriteController,
};
