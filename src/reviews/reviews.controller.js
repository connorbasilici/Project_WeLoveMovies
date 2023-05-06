const service = require("./reviews.service.js");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary.js");

async function reviewExists(req, res, next) {
    const { reviewId } = req.params;
    const review = await service.read(reviewId);
    if (review) {
        res.locals.review = review;
        return next();
    } 
    return next({ status: 404, message: `Review cannot be found.` }); 
}

async function list(req, res, next) {
    data = await service.list(); 
    res.json({data}); 
}

async function read(req, res, next) {
    const { reviewId } = req.params; 
    console.log("review id", reviewId); 
    const data = await service.read(reviewId); 
    res.json({ data: data }); 
}

async function destroy(req, res) {
    const data = await service.delete(res.locals.review.review_id); 
    res.sendStatus(204); 
}

async function update(req, res) {
    const updatedReview = {
      ...res.locals.review,
      ...req.body.data,
      review_id: res.locals.review.review_id,
    };
    const data = await service.update(updatedReview);
    res.json({ data });
}

module.exports = {
    list: asyncErrorBoundary(list),
    read: [asyncErrorBoundary(reviewExists), read],
    update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
    delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
};