import dotenv from "dotenv";
import pkg from 'pg';

dotenv.config();
const { Client } = pkg;

const client = new Client({
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    port: Number(process.env.DATABASE_PORT)
});

const db = async(): Promise<void> => {
    await client.connect();
    console.log("Database connected!");
}

export { client, db };