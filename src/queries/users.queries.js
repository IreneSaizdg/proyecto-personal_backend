// QUERIES: usuarios
const userQueries = {
    // 1. Obtener todos los usuarios y sus datos
    getAllUsers: `
        SELECT user_id, name, email, role, privileges
        FROM users
        ORDER BY user_id ASC;
    `,

    // 2. Obtener usuario por ID
    getUserById: `
        SELECT user_id, name, email, role, privileges
        FROM users
        WHERE user_id = $1;
    `,

    // 3. Actualizar usuario por ID
    updateUserById: `
        UPDATE users
        SET
        name = COALESCE($1, name),
        email = COALESCE($2, email),
        role = COALESCE($3, role),
        privileges = COALESCE($4, privileges)
        WHERE user_id = $5
        RETURNING user_id, name, email, role, privileges;
    `,

    // 3. Borrar usuario por ID
    deleteUserById: `
        DELETE FROM users
        WHERE user_id = $1
        RETURNING *;
    `,
    };

module.exports = userQueries;