const knex = require("../db/connection"); 

function list() {
    return knex("movies as m")
    .select(
        "m.movie_id as id",
        "m.title",
        "m.runtime_in_minutes",
        "m.rating",
        "m.description",
        "m.image_url"
    ); 
}

function listMoviesCurrentlyShowing() {
    return knex("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .distinct(
        "m.movie_id as id",
        "m.title",
        "m.runtime_in_minutes",
        "m.rating",
        "m.description",
        "m.image_url"
    )
    .where({"mt.is_showing": true}); 
}

function read(movieId) {
    return knex("movies as m")
    .select("*")
    .where({ movie_id: movieId })
    .first();  
}

function readMovieTheaters(movieId) {
    return knex("theaters as t")
    .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
    .select("t.*")
    .where({ movie_id: movieId, is_showing: true }); 
}

function readMovieReviews(movieId) {
    return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select(
        "r.review_id", 
        "r.content",
        "r.score",
        "r.created_at as review_created_at",
        "r.updated_at as review_updated_at",
        "c.critic_id",
        "r.movie_id",
        "c.preferred_name",
        "c.surname",
        "c.organization_name",
        "c.created_at as critic_created_at",
        "c.updated_at as critic_updated_at"
    )
    .where({ movie_id: movieId }); 
}

module.exports = {
    list,
    listMoviesCurrentlyShowing,
    read,
    readMovieTheaters,
    readMovieReviews
};