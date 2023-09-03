import { Db, ObjectId } from 'mongodb';
import { Mongo } from './connect.js';
import { DbCollections } from './constants.js';
import { Console } from '../config/console.js';

export class MongoMethods {
    private db!: Db;
    private collection: DbCollections;

    constructor(collection: DbCollections) {
        this.collection = collection;
        this.initialize();
    }

    async initialize() {
        try {
            this.db = await Mongo.getDBInstace();
        } catch (error: any) {
            Console.Error(error.message);
        }
    }

    async findOne(data: object) {
        return await this.db.collection(this.collection).findOne(data);
    }

    async findById(id: string) {
        const objectId = new ObjectId(id);
        return await this.db.collection(this.collection).findOne({ _id: objectId });
    }

    async create(data: object) {
        return await this.db.collection(this.collection).insertOne(data);
    }
}