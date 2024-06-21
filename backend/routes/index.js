import express from 'express';
import { getBooks, postBooks, putBooks, deleteBooks} from '../controllers/bookController.js'; 

const router = express.Router();

router.route('/books').get(getBooks).post(postBooks);
router.route('/books/:id').put(putBooks).delete(deleteBooks);

export default router;
