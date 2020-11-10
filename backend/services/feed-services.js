var Feed = require('../models/feed')

exports.getFeeds = async function (query, page, limit) {
    try {
        const feeds = await Feed.find();
        return feeds;
    } catch (e) {
        throw Error('Error while getting Feeds')
    }
}

exports.getFeed = async function (query, page, limit) {
    try {
        const feeds = await Feed.findOne(query);
        return feeds;
    } catch (e) {
        // Log Errors
        throw Error('Error while getting Feeds')
    }
}

exports.createFeed = async function(params) {
    const feed = new Feed(params);
    feed.save(function(err, doc) {
        if (err) throw Error('Error while creating feed')
        console.log("Document inserted successfully!");
    });
    return feed;
}