// IMPORTS
const dbConnection = require('../utils/dbConnection.util');
const { dbQuery } = require('../utils/dbQuery.util');
const userQueries = require('../queries/users.queries')


// 1. Crear Usuario
async function createUser({ name, email, password, role = "user", privileges = null }) {
  const values = [ name, email, password, role, privileges ];
  const result = await dbQuery(userQueries.insertUser, values);
  return result.rows[0]; //Devuelve el recurso recién creado
}


// 2. Ver todos los usuarios (admin)
async function getAllUsers() {
    const { rows } = await dbConnection.query(userQueries.getAllUsers);
    return rows;
}


// 3. Eliminar un usuario por ID 
async function deleteUserById(userId) {
    const { rows } = await dbConnection.query(userQueries.deleteUserById, [userId]);
    return rows[0];
}


// 4. Ver usuario por ID
async function getUserById(userId) {
    const { rows } = await dbConnection.query(userQueries.getUserById, [userId]);
    return rows[0];
}


// 5. Actualizar usuario por ID
async function updateUserById({ name, email, password, role = "user", privileges = null, user_id }) {
  const values = [name, email, password, role, privileges, user_id];
  const result = await dbQuery(userQueries.updateUserById, values);
  return result.rows[0] || null;
}




// EXPORTS
module.exports = {
  createUser,
  getUserById,
  getAllUsers,
  updateUserById,
  deleteUserById,
}