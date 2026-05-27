export default function validatePost(req, res, next) {
    const { title, content, tags } = req.body;

    if (!title || typeof title !== 'string' || !content || typeof content !== 'string' || !Array.isArray(tags)) {
        return res.status(400).json({
            error: 'Dati non validi: title (string), content (string) e tags (array) sono obbligatori.',
            results: null
        });
    }

    next();
}