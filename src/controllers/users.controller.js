// IMPORTS
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
  getUserByEmail
} = require("../models/user.model");



// CONTROLLER: 1. Crear nuevo usuario
const createUserController = async (req, res, next) => {
  try {
    const newUser = await createUser(req.body);
    res.status(201).json(newUser);

  } catch (error) {
    console.error('Error al crear nuevo usuario:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};


// CONTROLLER: 2. Ver todos los usuarios
const getUsersController = async (req, res, next) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};


// CONTROLLER: 3. Eliminar un usuario por ID
const deleteUserByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedUser = await deleteUserById(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.status(200).json(deletedUser);
  } catch (error) {
    next(error);
  }
};


// CONTROLLER: 4. Obtener usuario por ID 
const getUserByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};


// CONTROLLER: 5. Editar un usuario por ID
const putUserByIdController = async (req, res, next) => {
  try {
    const user_id = Number(req.params.user_id);
    if (isNaN(user_id)) {
      return res.status(400).json({ ok: false, error: "ID de usuario inválido" });
    }

    const { name, email, password, role = "user", privileges = null } = req.body;

    const updatedUser = await updateUserById({
      user_id, name, email, password, role, privileges
    });

    if (!updatedUser) {
      return res.status(404).json({
        ok: false,
        error: "Usuario no encontrado o no actualizado",
      });
    }

    res.status(200).json({
      ok: true,
      data: updatedUser,
    });

  } catch (error) {
    console.error("Error en updateUserByIdController:", error);
    res.status(500).json({
      ok: false,
      error: "Error interno al actualizar el usuario.",
    });
  }
};


// CONTROLER: 6. Obtener usuario por Email
const getUserByEmailController = async (req, res, next) => {
  try {
    const { email } = req.params;
    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};


// EXPORTS
module.exports = {
  createUserController,
  getUsersController,
  getUserByIdController,
  putUserByIdController,
  deleteUserByIdController,
  getUserByEmailController
};