const express = require('express');
const router = express.Router();

const auth = require('../middlewares/is-Auth');
const authHelper = require('../helpers/auth');
const adminActionsHelper = require('../helpers/adminActions');
const userActionsHelper = require('../helpers/userActions');

// auth routes
router.route('/signup')
 .post(authHelper.signup)

router.route('/signin')
 .post(authHelper.signin)

// admin routes
router.route('/setuuid')
 .put(auth.adminAuth,adminActionsHelper.setUUID)

router.route('/movie')
 .post(auth.adminAuth,adminActionsHelper.addMovie)
 .delete(auth.adminAuth,adminActionsHelper.removeMovie)

// user routes
router.route('/getallmovies')
 .get(auth.userAuth,userActionsHelper.getAllMovies)

router.route('/getmoviesbyids')
 .post(auth.userAuth,userActionsHelper.getMoviesByIds)

router.route('/recommend')
 .get(auth.userAuth,userActionsHelper.getRecommendationsFromModel)
 .post(auth.userAuth,userActionsHelper.createUserInModel)
 .put(auth.userAuth,userActionsHelper.addMoviesInUserInModel)
 .delete(auth.userAuth,userActionsHelper.removeMovieFromUserInModel)

router.route('/usermovie')
 .get(auth.userAuth,userActionsHelper.getMoviesFromUserAccount)
 .post(auth.userAuth,userActionsHelper.addMoviesToUserAccount)
 .delete(auth.userAuth,userActionsHelper.removeMovieFromUserAccount)

module.exports = router;