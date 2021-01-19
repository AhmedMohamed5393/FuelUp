var express            = require('express'),
    router             = express.Router(),
    bodyParser         = require('body-parser'),
    parseUrlencoded    = bodyParser.urlencoded({ extended: true }),
    methodOverride     = require('method-override'),
    authentication     = require('./middlewares/authentication'),
    authorization      = require('./middlewares/authorization'),
    signupcontroller   = require('./controllers/user/signup'),
    signincontroller   = require('./controllers/user/login'),
    profilecontroller  = require('./controllers/user/profile'),
    editusercontroller = require('./controllers/user/edit'),
    getusercontroller  = require('./controllers/user/get'),
    maincontroller     = require('./controllers/main');
router.use(methodOverride('_method'));
router.get('/', parseUrlencoded, maincontroller.GetHomePage);
router.get('/users/get', parseUrlencoded, authentication.isLoggedIn,
                                          authorization.checkAdminOwnership,
                                          getusercontroller.getUsers);
router.get('/user/login', parseUrlencoded, authentication.notLoggedIn,
                                           signincontroller.GetSignInPage);
router.post('/user/signup', parseUrlencoded, 
                                            // authentication.isLoggedIn,
                                            //  authorization.checkInstituteOwnership,
                                             signupcontroller.PostSignUpPage);
router.post('/user/login', parseUrlencoded, authentication.notLoggedIn,
                                            signincontroller.PostSignInPage);
router.get('/user/:id', parseUrlencoded, authentication.isLoggedIn,
                                         profilecontroller.GetUserProfile);
router.get('/user/:id/edit', parseUrlencoded, authentication.isLoggedIn,
                                              authorization.checkUserOwnership,
                                              editusercontroller.showEdition);
router.put('/user/:id/edit', parseUrlencoded, authentication.isLoggedIn,
                                              authorization.checkUserOwnership,
                                              editusercontroller.UpdateUser);
router.delete('/user/:id/delete', parseUrlencoded,
                                  authentication.isLoggedIn,
                                  authorization.checkInstituteOwnership,
                                  editusercontroller.DeleteUser);
router.get('/user/:id/logout', parseUrlencoded, authentication.isLoggedIn,
                                                authentication.logout);
module.exports = router;