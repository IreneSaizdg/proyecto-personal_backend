// IMPORTS
const {
  getAllUsers,
  getUserById,
  createUser,
  deleteUserById,
} = require("../models/user.model");



// CONTROLLER: 1. Obtener todos los usuarios
const getUsers = async (req, res, next) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

// CONTROLLER: 2. Obtener un usuario por ID
const getUser = async (req, res, next) => {
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

// CONTROLLER: 3. Crear nuevo usuario
const postUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const newUser = await createUser({ username, email, password });

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

// CONTROLLER: 4. Actualizar un usuario por ID
const putUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedUser = await updateUserById(id, req.body);

    if (!updatedUser) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

// CONTROLLER: 5. Eliminar un usuario por ID
const deleteUser = async (req, res, next) => {
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



// EXPORTS
module.exports = {
  getUsers,
  getUser,
  postUser,
  putUser,
  deleteUser,
};