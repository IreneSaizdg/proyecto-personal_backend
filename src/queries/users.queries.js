// QUERIES: usuarios
const userQueries = {

    // QUERIE: 1. Crear usuario
    insertUser: `
        INSERT INTO users (name, email, password, role, privileges)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
    `,

    // QUERIE: 2. Obtener todos los usuarios y sus datos
    getAllUsers: `
        SELECT user_id, name, email, role, privileges
        FROM users
        ORDER BY user_id ASC;
    `,

    // QUERIE: 3. Eliminar usuario por ID
    deleteUserById: `
        DELETE FROM users
        WHERE user_id = $1
        RETURNING *;
    `,

    // QUERIE: 4. Obtener usuario por ID
    getUserById: `
        SELECT user_id, name, email, role, privileges
        FROM users
        WHERE user_id = $1;
    `,

    // QUERIE: 5. Editar usuario por ID
    updateUserById: `
        UPDATE users
        SET
            name = COALESCE($1, name),
            email = COALESCE($2, email),
            password = COALESCE($3, password),
            role = COALESCE($4, role),
            privileges = COALESCE($5, privileges)
        WHERE user_id = $6
        RETURNING user_id, name, email, role, privileges;
    `,

    // QUERIE: 6. Obtener usuario por email
    getUserByEmail: `
        SELECT user_id, name, email, role, privileges, password
        FROM users
        WHERE email = $1;
    `,
};


module.exports = userQueries