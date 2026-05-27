import express from 'express';
import { index, show, create, update, destroy } from '../controllers/posts.js';
import validatePost from '../middlewares/validatePost.js';

const router = express.Router();

// Rotta per l'indice (Index) - GET /posts
router.get('/', index);

// Rotta per il dettaglio (Show) - GET /posts/:slug
router.get('/:slug', show);

// Rotta per la creazione (Create) - POST /posts
router.post('/', validatePost, create);

// Rotta per l'aggiornamento (Update) - PUT /posts/:slug
router.put('/:slug', validatePost, update);

// Rotta per la cancellazione (Delete) - DELETE /posts/:slug
router.delete('/:slug', destroy);

export default router;