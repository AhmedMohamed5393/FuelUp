var User = require('../models/user');
module.exports = {
    checkAdminOwnership: (req, res, next) => {
        var errors = [];
        if(req.isAuthenticated()){
            if(req.user._id == req.params.id || req.user.role == "admin"){
                User.findById(req.params.id).then(user => {
                    next();
                }).catch(err => {
                    errors.push({ msg: err.msg });
                });
            }
        }
    },
    checkUserOwnership: (req, res, next) => {
        var errors = [];
        if(req.isAuthenticated()){
            if(req.user._id == req.params.id){
                User.findById(req.user._id).then(user => {
                    next();
                }).catch(err => {
                    errors.push({ msg: err.msg });
                });
            }
        }
    }
}