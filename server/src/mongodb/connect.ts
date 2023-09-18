import { MongoClient, GridFSBucket } from 'mongodb';
import { Console } from '../config/console.js';
import { ServerError } from '../middlewares/error.handler.js';
import { DataBaseName, DbCollections } from './constants.js';
import { IGridFsBuckets } from '../types/mongodb.types.js';

export class Mongo {
    static mongoInstance: Mongo;
    static mongoClient: MongoClient;
    static gridFsBuckets: IGridFsBuckets;
    static retryCount: number;

    private constructor(mongouri: string) {
        Mongo.mongoClient = new MongoClient(mongouri);
        Mongo.retryCount = 0;
        this.connect();
    }

    private async connect() {
        Console.Log('Connecting to Database ...');
        try {
            await Mongo.mongoClient.connect();
            const db = Mongo.mongoClient.db(DataBaseName);
            const collectionList = (await db.listCollections().toArray()).map(item => item.name);
            const dbCollection = Object.values(DbCollections).map(item => item.toString());
            
            dbCollection.forEach(async(item) => {
                if(!collectionList.includes(item)) {
                    await db.createCollection(item);
                    Console.Log(`Collection '${item}' created in Database`);
                }
            });

            const Bucket1 = new GridFSBucket(db, {
                bucketName: 'music_source'
            });

            const Bucket2 = new GridFSBucket(db, {
                bucketName: 'music_thumbelina'
            });

            Mongo.gridFsBuckets = {
                songs: Bucket1, thumbelina: Bucket2
            }

            Console.Log('Database Connection Successful');
        } catch (error: any) {
            Console.Error(`Database connection failed: ${error.message}`);
            Console.Log(`Retrying to connect to Database`);
            this.retryToConnnect();
            Mongo.retryCount++;
        }
    }

    private retryToConnnect() {
        if(Mongo.retryCount < 3) {
            this.connect();
        }
    }

    static async createInstace(mongoUri: string) {
        if(!Mongo.mongoInstance) {
            Mongo.mongoInstance = new Mongo(mongoUri);
        }
    }

    static async getDBInstace() {
        if(!Mongo.mongoClient) {
            throw new ServerError('Mongo Client Instance Not Found');
        }
        return Mongo.mongoClient.db(DataBaseName);
    }
}