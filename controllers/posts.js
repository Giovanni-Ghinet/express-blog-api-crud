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
    return 
}

function destroy(request, response) {
    const { id } = request.params;
    const realId = parseInt(id);

    const postIndex = posts.findIndex(post => post.id === realId);

    if (postIndex === -1) {
        return response.status(404).json({
            error: 'Post non trovato',
            results: null
        });
    }

    // Rimuovo il post dall'array
    posts.splice(postIndex, 1);

    console.log('Post rimosso con successo. Elenco attuale:', posts);
    response.sendStatus(204);
}

function show(request, response) {
    const { id } = request.params;

    const realId = Number(id.trim());

    if (isNaN(realId)) {
        response.status(404)
            .json({
                error: 'Parametro "id" non corretto',
                results: null
            });
        return;
    }

    if (realId <= 0) {
        response.status(404)
            .json({
                error: 'Parametro "id" negativo o zero (CORREGGI)',
                results: null,
            });
        return;
    }

    const postFound = posts.find(post => {
        return post.id === realId
    });

    if (postFound === undefined) {
        response.status(404)
            .json({
                error: 'Post non trovato',
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
    response.json({
        messaggio: 'Richiesta di creazione'
    })
}

export {
    index,
    show,
    create,
    update,
    destroy
};