import express from 'express';
const router = express.Router();
import uploadController from '../../controllers/upload.controller';
import upload from '../../auth/upload';

app.post('/upload', upload.single('picture'), uploadController.uploadFile);

export { router };
