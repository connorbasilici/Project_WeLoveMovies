const knex = require("../db/connection"); 

function list() {
    return knex("reviews")
    .select("*"); 
}

function read(reviewId) {
    return knex("reviews")
    .select("*")
    .where({ review_id: reviewId })
    .first();  
}

function getCritic(critic_id) {
    return knex("critics").where({ critic_id: critic_id }).first();
}


async function setCritic(review) {
    review.critic = await getCritic(review.critic_id);
    return review;
}

function update(review) {
    return knex("reviews as r")
    .where({ review_id: review.review_id })
    .update(review, "*")
    .then(() => read(review.review_id))
    .then(setCritic);
}
  
function destroy(reviewId) {
    return knex("reviews").where({ review_id: reviewId }).del();
}

module.exports = {
    list,
    read,
    update,
    delete: destroy,
};