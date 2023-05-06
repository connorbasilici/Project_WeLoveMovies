const service = require("./movies.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary"); 
const notFound = require("../errors/notFound"); 

async function movieExists(req, res, next) {
    const { movieId } = req.params;
    const movie = await service.read(movieId);
    if (movie) {
        res.locals.movie = movie;
        return next();
    } 
    return next({ status: 404, message: `Movie cannot be found.` }); 
}

async function list(req, res, next) {
    const { is_showing } = req.query; 
    console.log(typeof(is_showing)); 
    if (is_showing && is_showing === "true") {
        data = await service.listMoviesCurrentlyShowing(); 
        res.json({ data });
    } else {
        const data = await service.list(); 
        res.json({ data });
    }
}

async function read(req, res, next) {
    const { movieId } = req.params; 
    const data = await service.read(movieId); 
    res.json({ data: data }); 
}

async function readMovieTheaters(req, res, next) {
    const { movieId } = req.params; 
    const data = await service.readMovieTheaters(movieId); 
    res.json({ data: data }); 
}

async function readMovieReviews(req, res, next) {
    const { movieId } = req.params; 
    const data = await service.readMovieReviews(movieId); 
    const result = data.map((review) => {
        return {
            review_id: review.review_id,
            content: review.content,
            score: review.score,
            created_at: review.review_created_at,
            updated_at: review.review_updated_at,
            critic_id: review.critic_id, 
            movie_id: review.movie_id,
            critic: {
                critic_id: review.critic_id,
                preferred_name: review.preferred_name,
                surname: review.surname,
                organization_name: review.organization_name,
                created_at: review.critic_created_at,
                updated_at: review.critic_updated_at
            }
        }
    }); 
    res.json({ data: result }); 
}

module.exports = {
    list: asyncErrorBoundary(list),
    read: [asyncErrorBoundary(movieExists), read],
    readMovieTheaters: [asyncErrorBoundary(movieExists), readMovieTheaters],
    readMovieReviews: [asyncErrorBoundary(readMovieReviews)],
};