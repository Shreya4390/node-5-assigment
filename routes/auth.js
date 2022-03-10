import express from 'express';
import { authentication, verifyToken } from '../middleware/authentication';
import controller from '../controllers/auth.controller';

const router = express.Router();

router.post('/auth/generateToken', authentication);
router.post('/auth/setdata', verifyToken, controller.setfiledata);
router.get('/auth/getdata', verifyToken, controller.getfiledata);
router.post('/auth/upload', verifyToken, controller.uploadFile);

export default router;