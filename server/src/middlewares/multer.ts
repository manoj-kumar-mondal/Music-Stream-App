import multer, { diskStorage } from 'multer';

const storage = diskStorage({
    destination: function (req, file, callBack) {
        callBack(null, 'temp/song-uploads');
    },

    filename: function(req, file, callBack) {
        const date = new Date(Date.now());
        const dateString = `${date.getDate()}${date.getMonth()}${date.getFullYear()}_` + 
                            `${date.getHours()}${date.getMinutes()}${date.getSeconds()}_` +
                            `${Math.round(Math.random() * 10000)}`;
        let extention = file.originalname.slice(file.originalname.lastIndexOf('.'));
        const fileName = `music_file_${dateString}${extention}`;
        callBack(null, fileName);
    }
});

export const multerUpload = multer({ storage });