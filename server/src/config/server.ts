import express from 'express';
import { Console } from './console.js';
import { handleApiRequest, handleErrorOnRequest, handleUnknownRouteRequest } from '../middlewares/app.handler.js';
import router from '../routes/index.js';
import { connectToDatabase } from './connectDB.js';

const app = express();

app.use(handleApiRequest);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', router);
app.use(handleErrorOnRequest);
app.use(handleUnknownRouteRequest);

export const startServer = (port: number, mongodbUri: string) => {
    if(!mongodbUri) {
        throw new Error('Mongo DB String is not found');
    }
    connectToDatabase(mongodbUri, app, port);
}