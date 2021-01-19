var User = require('../../models/user');
module.exports = {
    getUsers: (req, res) => {
        var errors  = [];
        User.find().then(users => {
            res.status(200).json(users);
        }).catch(err => {
            req.flash('error_msg', "Sorry, Please try again later");
            errors.push({ msg: err.message });
            res.json(errors);
        });
    }
}