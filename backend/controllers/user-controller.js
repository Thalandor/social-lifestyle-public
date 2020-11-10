var UserService = require('../services/user-services');

exports.getUsers = async function (req, res, next) {
    try {
        const result = await UserService.getUsers({
            publicAddress: req.query.publicAddress,
        });
        //   return res.status(200).json({ status: 200, data: users, message: "Succesfully Users Retrieved" });
        return res.json(result);
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}