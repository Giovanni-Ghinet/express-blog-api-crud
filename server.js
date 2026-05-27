import express from 'express';
import postsRouter from './routers/posts.js';
import notFound from './middlewares/notFound.js';
import errorsHandler from './middlewares/errorsHandler.js';

const app = express();
const port = process.env.PORT || 3000;

// Middleware per leggere i dati in formato JSON dalle richieste
app.use(express.json());

// Registrazione delle rotte dei post con prefisso /posts
app.use('/posts', postsRouter);

// Middleware per la gestione delle rotte non trovate (404)
app.use(notFound);

// Middleware per la gestione globale degli errori (500)
app.use(errorsHandler);

app.listen(port, (error) => {
    
    if (error) {
        console.error(error);
        return;
    }

    console.log(`Server started at port ${port}`);
});