import { unlink, opendir } from 'node:fs/promises';
import { openSync, readSync } from 'node:fs';
import { Console } from '../config/console.js';

export class Utility {
    static async deleteFile(filePath: string) {
        Console.Log(`Deleting file: ${filePath}`);

        try {
            await unlink(filePath);
        } catch (error: any) {
            Console.Error(error.message);
        }
    }

    static async rmfilesfromTemp() {
        const dirPath = 'temp/song-uploads';

        const dir = await opendir(dirPath);

        for await (let dirent of dir) {
            console.log(`${dirPath}/${dirent.name}`);
            await unlink(`${dirPath}/${dirent.name}`);
        }
    }

    static async extractFileInfo(filePath: string) {
        const buffer = Buffer.alloc(128);
        const fd = openSync(filePath, 'r');
        readSync(fd, buffer, 0, 128, 0);

        const title = buffer.toString('utf8', 3, 33).trim();
        const artist = buffer.toString('utf8', 33, 63).trim();
        const album = buffer.toString('utf8', 63, 93).trim();
        const year = buffer.toString('utf8', 93, 97).trim();
        const comment = buffer.toString('utf8', 97, 127).trim();
  
        console.log('Title:', title);
        console.log('Artist:', artist);
        console.log('Album:', album);
        console.log('Year:', year);
        console.log('Comment:', comment);
    }
}