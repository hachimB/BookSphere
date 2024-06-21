import express from 'express';
import AppController from '../controllers/AppController.js'; 

const router = express.Router();

router.get('/', AppController.getHomepage);

export default router;