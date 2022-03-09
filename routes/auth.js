import express from 'express';
// import { authentication, requestTime } from '../middleware/authentication';
import controller from '../controllers/auth.controller';

const router = express.Router();

router.post('/auth/setdata', controller.setfiledata);
router.get('/auth/getdata', controller.getfiledata);
router.post('/auth/upload', controller.uploadFile);

export default router;