import express from 'express';
import postsRouter from './routers/posts.js';

const app = express();
const port = process.env.PORT || 3000;

// Middleware per leggere i dati in formato JSON dalle richieste
app.use(express.json());

// Registrazione delle rotte dei post con prefisso /posts
app.use('/posts', postsRouter);

app.listen(port, (error) => {
    
    if (error) {
        console.error(error);
        return;
    }

    console.log(`Server started at port ${port}`);
});