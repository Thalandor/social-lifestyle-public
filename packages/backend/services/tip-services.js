var Tips = require('../models/tips')

exports.storeTip = async function (params) {
    const tip = new Tips(params);
    tip.save(function (err, doc) {
        if (err) throw Error('Error while storing tip')
        console.log("Document inserted succussfully!");
    });
    return tip;
} 
