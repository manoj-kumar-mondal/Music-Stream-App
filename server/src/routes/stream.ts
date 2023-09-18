import { Router } from 'express';
import { multerUpload } from '../middlewares/multer.js';
import { handleFileDownload, handleFileUpload, testHandler } from '../controllers/stream.controller.js';
import { downloadStreamValidator, uploadStreamValidator } from '../middlewares/api.validator.js';

const router = Router();


router.post('/upload', multerUpload.fields([
    {name: 'musicFile', maxCount: 1},
    {name: 'thumbelinaFile', maxCount: 1}
]), uploadStreamValidator, handleFileUpload);

router.get('/download/:id', downloadStreamValidator, handleFileDownload);

router.get('/file', testHandler);
export default router;