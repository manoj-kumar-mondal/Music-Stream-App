import { createReadStream, statSync } from 'node:fs';
import { RequestHandler } from 'express';
import { ObjectId } from 'mongodb';
import { ClientError, ServerRouteError } from '../middlewares/error.handler.js';
import { EStatusCode } from '../constants/statusCode.js';
import { Mongo } from '../mongodb/connect.js';
import { Utility } from '../utils/utility.js';
import { IRouteUploadStreamData } from '../types/routes.objects.js';
import { Console } from '../config/console.js';
import { ISongCollection } from '../types/mongodb.types.js';
import { Collection } from '../mongodb/collections.js';

export const handleFileUpload: RequestHandler = async (req, res, next) => {
    try {
        const { title, artist }: IRouteUploadStreamData = req.body;

        //@ts-ignore
        const musicFile  = req.files['musicFile'][0] as Express.Multer.File;
        //@ts-ignore
        const thumbelina = req.files['thumbelinaFile'];

        if(musicFile.mimetype !== 'audio/mpeg') {
            throw new ClientError('Only Mp3 files are supported', EStatusCode.UNPROCESSABLE_CONTENT);
        }

        if(thumbelina && 
           (thumbelina[0] as Express.Multer.File).mimetype !== 'image/jpeg' &&
           (thumbelina[0] as Express.Multer.File).mimetype !== 'image/png'
        ) {
            throw new ClientError('only jpeg and png allowed for thumbelina', EStatusCode.UNPROCESSABLE_CONTENT);
        }
        
        const songBucket = Mongo.gridFsBuckets.songs;
        const songPath = `temp/song-uploads/${musicFile.filename}`
        const fileStream = createReadStream(songPath);
        const songId = new ObjectId();
        const upload = songBucket.openUploadStreamWithId(songId, musicFile.filename);

        fileStream.pipe(upload);

        upload.on('error', (err) => {
            throw new ServerRouteError(err.message, EStatusCode.UNPROCESSABLE_CONTENT);
        });

        upload.on('finish', async () => {
            await Utility.deleteFile(songPath);            
        });

        const songDetails: ISongCollection = {
            title, artist, songId, thumbelinaId: null
        }

        if(thumbelina) {
            const thumbelinaBucket = Mongo.gridFsBuckets.thumbelina;
            const thumbelinaPath = `temp/song-uploads/${thumbelina[0].filename}`
            const fileStream = createReadStream(thumbelinaPath);
            const thumbelinaId = new ObjectId();

            const uploadThumbelina = thumbelinaBucket.openUploadStreamWithId(thumbelinaId, thumbelina[0].filename);

            fileStream.pipe(uploadThumbelina);

            songDetails.thumbelinaId = thumbelinaId;

            uploadThumbelina.on('error', (err) => {
                throw new ServerRouteError(err.message, EStatusCode.UNPROCESSABLE_CONTENT);
            });

            uploadThumbelina.on('finish', async () => {
                Console.Log('Thumbelina Uploaded');
                await Utility.deleteFile(thumbelinaPath);
            });
        }

        await Collection.Song.create(songDetails);
        res.status(EStatusCode.CREATED).json({ message: 'Song Uploaded successfully'});

    } catch (error) {
        next(error);
    }
}

export const handleFileDownload: RequestHandler = async (req, res, next) => {
    try {
        const id = req.params.id;
        const range  = req.headers.range!;
    
        const parts = range.replace(/bytes=/, '').split('-');

        const start = parseInt(parts[0], 10);
        let end = parts[1] ? parseInt(parts[1], 10) : (start + 100 * 1024) //100kb
        const size = statSync('temp/song-uploads/music_file_782023_13144_636.mp3').size;

        const song = await Collection.Song.findById(id);
        const songBucket = Mongo.gridFsBuckets.songs;

        if(!song) {
            throw new ClientError('Song Not Found', EStatusCode.NOT_FOUND);
        }

        songBucket.openDownloadStream(song.songId).pipe(res);
        // if(end > size) {
        //     end = size
        // }
        // const fileStream = createReadStream('temp/song-uploads/music_file_782023_13144_636.mp3', {
        //     start: start, end: end
        // });

        // res.setHeader('Content-Type', 'audio/mpeg');
        // res.setHeader('Content-Range', `bytes ${start}-${end}/${size}`);
        // // console.log(`bytes ${start}-${end}/${size}`);
        // res.setHeader('Content-Length', end - start + 1);
        // res.status(206);

        // fileStream.pipe(res);
        // const stream = createReadStream('temp/song-uploads/music_file_782023_13144_636.mp3');
        // stream.pipe(res);
    } catch (error) {
        next(error);
    }
}

export const testHandler: RequestHandler = (req, res, next) => {
    try {
        const range = req.headers?.range;
    
        // if(!range) {
        //     throw new ClientError('Range Property required in header', EStatusCode.FORBIDDEN);
        // }
    
        const path = 'temp/song-uploads/music_file_782023_13144_636.mp3';
        const fileStream = createReadStream(path,{
            highWaterMark: 100
        });
    
        res.setHeader('Content-Type', 'audio/mpeg');
        res.status(206);
        
        console.log('1 kb sent');
        fileStream.pipe(res);

        // res.sendFile('C:/Users/MAMONDAL/Self/Projects/TypeScript/Music Streaming App/server/temp/dummy/file1.txt');

    } catch (error) {
        next(error);
    }
}