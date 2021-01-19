module.exports = {
    isLoggedIn: (req , res , next) => {
        if(req.isAuthenticated()){
            return next();
        }else{
            res.redirect('/user/login');
        }
    },
    notLoggedIn: (req , res , next) => {
        if(!req.isAuthenticated()){
            return next();
        }else{
            res.json({
                message: 'Please log out first'
            });
        }
    },
    logout: (req , res , next) => {
        if(req.user._id == req.params.id){
            req.logout();
            req.flash('success_msg', 'You are logged out');
            res.redirect('/user/login');
        }
    },
    checkNotLogged: (req , res , next) => {
        next();
    }
}