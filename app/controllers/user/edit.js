var User    = require('../../models/user'),
    bcrypt  = require('bcryptjs');
module.exports = {
    showEdition: (req, res) => {
        var errors = [];
        User.findById(req.params.id).then(user => {
            res.status(200).json({ user: user });
        }).catch(err => {
            req.flash('error_msg', "Sorry, Please try again later");
            errors.push({ msg: err.message });
            res.json(errors);
        });
    },
    UpdateUser: (req, res) =>{     
        var errors = [],
            {
                work, certifications
            }      = req.body;
        bcrypt.genSalt(10, (e, salt) => {
            bcrypt.hash(phone, salt, (err, hash) => {
                if(err){
                    errors.push({ msg: err.message });
                }
                User.findByIdAndUpdate(req.params.id , {
                    name: req.body.name,
                    address: req.body.address,
                    email: req.body.email,
                    phone: hash,
                    role: req.body.role,
                    school: req.body.school,
                    gov: req.body.gov,
                    grade: req.body.grade,
                    certifications: certifications,
                    work: work
                }).then(updatedUser => {
                    req.flash(
                        'success_msg',
                        'The user is updated sucessfully'
                    );
                    res.status(201).json({ done: true });
                }).catch(err => {
                    req.flash('error_msg', "Sorry, Please try again later");
                    errors.push({ msg: err.message });
                    res.json({ done: false, errors });
                });
            });
        });
    },
    DeleteUser: (req, res) => {
        var errors = [];
        User.findByIdAndDelete(req.user._id).then(deletedUser => {
            req.flash('success_msg', 'This user is deleted successfully');
            res.json({ done: true });
        }).catch(err => {
            req.flash('error_msg', "Sorry, Please try again later");
            errors.push({ msg: err.message });
            res.json({ done: false, errors });
        });
    }
}