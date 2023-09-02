import { connect } from 'mongoose';
import { Console } from './console.js';
import { Application } from 'express';

export const connectToDatabase = (uri: string, appInstance: Application, port: number) => {
    Console.Log('Connecting to Database ...');
    connect(uri, {dbName: 'Music-Stream'})
    .then(() => {
        Console.Log('Database Connection Successful');
        appInstance.listen(port, () => Console.Log(`Server started at ${port}`));
    }).catch((err) => Console.Error(`Database connection failed: ${err.message}`));
}