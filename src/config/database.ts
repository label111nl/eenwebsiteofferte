import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// Create a connection pool with error handling
const connection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10, // Adjust the limit based on your needs
  queueLimit: 0,
});

// Test the database connection
async function testConnection() {
  try {
    const [rows] = await connection.query('SELECT 1 + 1 AS result');
    console.log('Database connection successful:', rows);
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1); // Exit the application if the connection fails
  }
}

testConnection();

export default connection;
