var FeedService = require('../services/feed-services');


exports.getFeeds = async function (req, res, next) {
    try {
        const result = await FeedService.getFeeds({
            title: req.query.title,
        });
        return res.json(result);
    } catch (error) {
        return res.status(400).json({ status: 400, message: error.message });
    }
}

exports.createFeed = async function(req, res) {
    try {
        const { user, title, description, image, category } = req.body;
        const newFeed = await FeedService.createFeed({
            user,
            title,
            description,
            image,
            category
        });
        return res.json(newFeed);            
    } catch (error) {
        return res.status(400).json({ status: 400, message: error.message });
    }
}