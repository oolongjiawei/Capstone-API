import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import knex from 'knex';
import knexConfig from '../knexfile.js';

// Initialize the database connection
// db is used to interact with the database, such as query, insert, update, delete and other operations.
const db = knex(knexConfig.development);

// So just using the JWT_SECRET from .env as a reference to generate the signature part of JWT_SECRE in the router will not expose the real .env JWT_SECRET.
// same as：const JWT_SECRET = process.env.JWT_SECRET;
const { JWT_SECRET } = process.env;

/**
 * User registration controller
 * Handles the logic for registering a new user
 */
const registerUser = async (req, res) => {
  const { email, username, password } = req.body;
  try {
    // Encrypt password
    // bcrypt.hash() is a function used to convert passwords into hashes. This process is irreversible. Hashed passwords can be stored securely in the database，is a one-time operation and there is no time limit on the hash value. As long as the hash exists in the database and the user's original password does not change, the hash will remain the same.
    // Why use password hashing?
    // Security: Even if the database is obtained by an attacker, the stored hash cannot be easily restored to the original password.
    // Salting: bcrypt generates a unique salt value for each password, ensuring that even if two users use the same password, their hashes are different.
    const hashedPassword = await bcrypt.hash(password, 10);

    // Store new user info in the database
    // db is a database instance created with Knex.js, a library for building SQL queries. It conveniently allows you to build and execute SQL queries using JavaScript syntax without having to write SQL statements directly.
    // Knex.js supports different database types (such as MySQL, PostgreSQL, SQLite, etc.) and provides a consistent API to operate different databases.
    const newUser = await db('users').insert({
      email,
      username,
      password: hashedPassword,
    });

    // Generate token and return to the client
    // jwt.sign() is used to generate a token containing user identity information. This process is irreversible. This token is usually set with an expiration time (expiresIn) when generated to prevent tokens from being misused over time. 
    // After expiration, the token becomes invalid and the user needs to log in again or obtain a new JWT by refreshing the token.
    const token = jwt.sign(
      { id: newUser[0] },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Return temporary JWT access token to client as verify confirm
    // The client side will typically store this JWT in localStorage, sessionStorage, or a cookie.
    // Use JWT for authentication:
    // During the validity period of the JWT, the client will append the JWT to the request header (for example, Authorization: Bearer <token>) every time it sends a request to the server.
    // After the server receives the request, it verifies the JWT's signature and validity period, and if the verification passes, the user is allowed to access the protected resource.
    res.json({ token });
  } catch (error) {
    res.status(400).json({ message: 'Error registering user' });
  }
};

/**
 * User login controller
 * Handles the logic for logging in a user
 */
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    // database query
    // db here is used to query the users table to find user records matching the provided email.
    const user = await db('users').where({ email }).first();

    // User verification
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Authentication is invalid' });
    }

    // Generate token and return to the client side
    const token = jwt.sign(
      { id: user.id },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Return temporary JWT access token to client side
    res.json({ 
      token,
      userId: user.id
    });
  } catch (error) {
    res.status(400).json({ message: 'Error logging in' });
  }
};

export {
    registerUser,
    loginUser,
};
