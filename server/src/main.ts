import { Console } from './config/console.js';
import { startServer } from './config/server.js';
import dotenv from 'dotenv';

dotenv.config();
const mongoUri = process.env.MONGODB_URI || '';
const port = Number(process.env.PORT) || 4000;
export const jwtPrivateKey = process.env.JWT_PRIVATE_KEY || '';

try {
    startServer(port, mongoUri);
} catch (error: any) {
    Console.Log(error?.message);
}
