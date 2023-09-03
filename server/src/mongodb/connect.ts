import { MongoClient, GridFSBucket } from 'mongodb';
import { Console } from '../config/console.js';
import { ServerError } from '../middlewares/error.handler.js';
import { DataBaseName, DbCollections } from './constants.js';

export class Mongo {
    static mongoInstance: Mongo;
    static mongoClient: MongoClient;
    static gridFSBucket: GridFSBucket;

    private constructor(mongouri: string) {
        Mongo.mongoClient = new MongoClient(mongouri);
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

            Mongo.gridFSBucket = new GridFSBucket(db, {
                bucketName: 'upload_song'
            });

            Console.Log('Database Connection Successful');
        } catch (error: any) {
            Console.Error(`Database connection failed: ${error.message}`);
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