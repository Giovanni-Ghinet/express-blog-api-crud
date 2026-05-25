import express from 'express';
import { index, show, create, update, destroy } from '../controllers/posts.js';

const router = express.Router();

// Rotta per l'indice (Index) - GET /posts
router.get('/', index);

// Rotta per il dettaglio (Show) - GET /posts/:id
router.get('/:id', show);

// Rotta per la creazione (Create) - POST /posts
router.post('/', create);

// Rotta per l'aggiornamento (Update) - PUT /posts/:id
router.put('/:id', update);

// Rotta per la cancellazione (Delete) - DELETE /posts/:id
router.delete('/:id', destroy);

export default router;