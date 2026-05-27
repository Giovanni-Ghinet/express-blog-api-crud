import posts from '../data/posts.js';

function index(request, response) {
    let filteredPosts = [...posts];
    const { tag, title } = request.query;

    if (tag) {
        filteredPosts = filteredPosts.filter(post => 
            post.tags.some(t => t.toLowerCase() === tag.toLowerCase())
        );
    }

    if (title) {
        filteredPosts = filteredPosts.filter(post => 
            post.title.toLowerCase().includes(title.toLowerCase())
        );
    }

    response.status(200).json(filteredPosts);
}

function update(request, response) {
    const { slug } = request.params;
    const { title, content, image, tags } = request.body;

    const postIndex = posts.findIndex(post => post.slug === slug);

    if (postIndex === -1) {
        return response.status(404).json({
            error: 'Post non trovato',
            results: null
        });
    }

    
    const newSlug = title.toLowerCase().replaceAll(' ', '-').replace(/[^\w-]+/g, '');

    const updatedPost = { 
        ...posts[postIndex], 
        title, 
        content, 
        image, 
        tags, 
        slug: newSlug 
    };
    posts[postIndex] = updatedPost;

    console.log('Post aggiornato con successo:', updatedPost);
    response.json(updatedPost);
}

function destroy(request, response) {
    const { slug } = request.params;

    const postIndex = posts.findIndex(post => post.slug === slug);

    if (postIndex === -1) {
        return response.status(404).json({
            error: 'Post non trovato',
            results: null
        });
    }

    
    posts.splice(postIndex, 1);

    console.log('Post rimosso con successo. Elenco attuale:', posts);
    response.sendStatus(204);
}

function show(request, response) {
    const { slug } = request.params;

    const postFound = posts.find(post => post.slug === slug);

    if (!postFound) {
        response.status(404)
            .json({
                error: 'Post non trovato tramite slug',
                results: null,
            });
        return;
    }

    response.status(200).json({
        error: null,
        results: postFound
    });

}

function create(request, response) {
    console.log('Dati in arrivo nel body:', request.body);
    const { title, content, image, tags } = request.body;

    
    const newId = posts.length > 0 ? posts[posts.length - 1].id + 1 : 1;
    const slug = title.toLowerCase().replaceAll(' ', '-').replace(/[^\w-]+/g, '');

    const newPost = {
        id: newId,
        slug,
        title,
        content,
        image: image || '/imgs/posts/placeholder.jpeg',
        tags
    };

    posts.push(newPost);

    response.status(201).json(newPost);
}

export {
    index,
    show,
    create,
    update,
    destroy
};