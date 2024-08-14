// Import dotenv to process environment variables from `.env` file.
// This line of code loads the environment variables in the .env file, ensuring that the process.env object contains sensitive information required for database connections, such as host, database name, username, and password
import "dotenv/config";

const knexConfig = {
    development: {
      client: 'mysql2',
      connection: {
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        charset: 'utf8',
      },
      migrations: {
        directory: './migrations',
      },
      seeds: {
        directory: './seeds'
      }
    }
  };
  
  export default knexConfig;