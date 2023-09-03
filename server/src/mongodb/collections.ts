import { DbCollections } from './constants.js';
import { MongoMethods } from './methods.js';

export class Collection {
    static User: MongoMethods;
    static Song: MongoMethods;

    private constructor() {
        Collection.User = new MongoMethods(DbCollections.USERS);
        Collection.Song = new MongoMethods(DbCollections.SONGS);
    }

    static async createInstace() {
        new Collection();
    }
}