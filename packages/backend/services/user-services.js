var UserLogin = require('../models/userLogin')

exports.getUsers = async function (query, page, limit) {
    try {
        const users = await UserLogin.find(query);
        return users;
    } catch (e) {
        // Log Errors
        throw Error('Error while getting Users')
    }
}

exports.getUser = async function (query, page, limit) {
    try {
        const users = await UserLogin.findOne(query);
        return users;
    } catch (e) {
        // Log Errors
        throw Error('Error while getting Users')
    }
}

exports.createUser = async function (params) {
    const user = new UserLogin(params);
    user.save(function (err, doc) {
        if (err) throw Error('Error while creating user')
        console.log("Document inserted succussfully!");
    });
    return user;
} 
