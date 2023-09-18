import express from 'express';
import cors from 'cors';
import { Console } from './console.js';
import {
    handleApiRequest, 
    handleErrorOnRequest, 
    handleUnknownRouteRequest
} from '../middlewares/app.handler.js';
import router from '../routes/index.js';
import { Mongo, Collection } from '../mongodb/index.js';

const app = express();

app.use(cors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:5500']
}));
app.use(handleApiRequest);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', router);
app.use(handleErrorOnRequest);
app.use(handleUnknownRouteRequest);

export const startServer = async (port: number, mongodbUri: string) => {
    if(!mongodbUri) {
        throw new Error('Mongo DB String is not found');
    }
    await Mongo.createInstace(mongodbUri);
    await Collection.createInstace();
    app.listen(port, () => Console.Log(`Server started at port ${port}`));
}