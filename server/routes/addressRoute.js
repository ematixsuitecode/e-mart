import express from 'express'
import { createAddress, getAddress } from '../controllers/addressController.js';
import { authenticateUser } from '../middlewares/authenticateMiddleware.js';

const router = express.Router();

router.post('/', authenticateUser, createAddress);
router.get('/', authenticateUser, getAddress);

export default router;