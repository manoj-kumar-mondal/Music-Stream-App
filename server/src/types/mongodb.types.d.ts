import { GridFSBucket, ObjectId } from 'mongodb';

export interface IGridFsBuckets {
    songs: GridFSBucket,
    thumbelina: GridFSBucket
}

export interface ISongCollection {
    title: string;
    artist: string;
    songId: ObjectId | null;
    thumbelinaId: ObjectId | null;
}