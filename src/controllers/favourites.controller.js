// IMPORTS
const {
  addFavourite,
  deleteFavouriteByUserAndResource,
  getFavouritesByUserId,
  isFavourite,
} = require("../models/favourite.model");



// CONTROLLER: 1. Añadir un favorito (user_id + resource_id)
const addFavouriteController = async (req, res) => {
  const { user_id, resource_id } = req.body;

  try {
    const alreadyExists = await isFavourite(user_id, resource_id);

    if (alreadyExists) {
      return res.status(409).json({
        success: false,
        message: "Este recurso ya está en favoritos",
      });
    }

    const newFavourite = await addFavourite(user_id, resource_id);

    return res.status(201).json({
      success: true,
      message: "Recurso añadido a favoritos correctamente",
      data: newFavourite,
    });
  } catch (error) {
    console.error("Error al añadir favorito:", error);
    return res.status(500).json({
      success: false,
      message: "Hubo un error al añadir a favoritos",
    });
  }
};

// CONTROLLER: 2. Eliminar un favorito por su ID
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

// CONTROLLER: 4. Obtener todos los favoritos de un usuario
const getFavouritesByUserIdController = async (req, res) => {
  const { user_id } = req.params;

  try {
    const favourites = await getFavouritesByUserId(user_id);

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

// CONTROLLER: 5. Comprobar si un recurso está en favoritos de un usuario
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
