const db = require('../utils/dbConnection.util');
const queries = require('../queries/users.queries');

// Obtener un usuario por ID (por ejemplo, para perfil)
async function getUserById(userId) {
    const { rows } = await db.query(queries.getUserById, [userId]);
    return rows[0];
}

// Obtener todos los usuarios (admin)
async function getAllUsers() {
    const { rows } = await db.query(queries.getAllUsers);
    return rows;
}

// Eliminar un usuario por ID (admin)
async function deleteUserById(userId) {
    const { rows } = await db.query(queries.deleteUserById, [userId]);
    return rows[0];
}

// Registrar un nuevo usuario
async function createUser({ uid, displayName, email, photoURL }) {
    const { rows } = await db.query(queries.createUser, [uid, displayName, email, photoURL]);
    return rows[0];
}

module.exports = {
getUserById,
getAllUsers,
deleteUserById,
createUser
};