const db = require("../models");
const axios = require('axios');

exports.getAllMovies = async function(req, res, next) {
  try {
     let movies=await db.Movie.find({});
     return res.status(200).json(movies);  
   } catch (err) {
    return res.status(400).json({error: err});
  }
}

exports.getMoviesByIds = async function(req, res, next) {
  try {
     let arr=req.body.ids;
     let ret=[];
     for(var i=0;i<arr.length;i++){
      let movie=await db.Movie.findOne({movieId: arr[i]});
      ret.push(movie);
     }
     return res.status(200).json(ret);
   } catch (err) {
    return res.status(400).json({error: err});
  }
}

exports.getRecommendationsFromModel = async function(req, res, next) {
  try {
    let user = await db.User.findOne({
      email: req.query.email
    });
    var obj = {
      user_id: user.userId,
      ratings: "None",
      type: "None",
      number: 20 
    }
    let url="https://recsys-1234.herokuapp.com/predict";
    var pr= axios.post(url,obj,{headers:{'Content-Type':'application/json'}});
    pr.then(data=>{
      console.log(data.data);
     return res.status(200).json(data.data);
    }).catch(err=>{
      return res.status(400).json({error: err});
    })
   } catch (err) {
    return res.status(400).json({error: err});
  }
}

exports.createUserInModel = async function(req, res, next) {
  try {
    var obj = {
      user_id: req.body.userId,
      ratings: req.body.ratings,
      type: "Create",
      number: 5 
    }
    let url="https://recsys-1234.herokuapp.com/predict";
    var pr= axios.post(url,obj,{headers:{'Content-Type':'application/json'}});
    pr.then(data=>{
     return res.status(200).json({msg: "User Creation Successful !!"});
    }).catch(err=>{
      return res.status(400).json({ModelError: err});
    })
   } catch (err) {
    return res.status(400).json({error: err});
  }
}

exports.addMoviesInUserInModel = async function(req, res, next) {
  try {
    var obj = {
      user_id: req.body.userId,
      ratings: req.body.ratings,
      type: "Add",
      number: 5 
    }
    let url="https://recsys-1234.herokuapp.com/predict";
    var pr= axios.post(url,obj,{headers:{'Content-Type':'application/json'}});
    pr.then(data=>{
     return res.status(200).json({msg: "Movies Addition Successful !!"});
    }).catch(err=>{
      return res.status(400).json({ModelError: err});
    })
   } catch (err) {
    return res.status(400).json({error: err});
  }
}

exports.removeMovieFromUserInModel = async function(req, res, next) {
  try {
    var obj = {
      user_id: req.body.userId,
      ratings: req.body.ratings,
      type: "Delete",
      number: 0 
    }
    let url="https://recsys-1234.herokuapp.com/predict";
    var pr= axios.post(url,obj,{headers:{'Content-Type':'application/json'}});
    pr.then(data=>{
     return res.status(200).json({msg: "Delete Request Successful !!"});
    }).catch(err=>{
      return res.status(400).json({error: err});
    })
   } catch (err) {
    return res.status(400).json({error: err});
  }
}

exports.getMoviesFromUserAccount = async function(req, res, next) {
  try {
     let user=await db.User.findOne({email: req.query.email});
     return res.status(200).json(user.movies);  
   } catch (err) {
    return res.status(400).json({error: err});
  }
}

exports.addMoviesToUserAccount = async function(req, res, next) {
  try {
    let user = await db.User.findOne({
      email: req.body.email
    });
    var movieIds=req.body.movieIds;
    for(var i=0;i<movieIds.length;i++)
    {  
     var obj = {
      id: movieIds[i].id,
      rating: movieIds[i].rating
     }
     user.movies.push(obj);
    }
    await user.save();
    return res.status(200).json({msg: "Movies Added"});
   } catch (err) {
    return res.status(400).json({error: err});
  }
}

exports.removeMovieFromUserAccount = async function(req, res, next) {
  try {
    let user = await db.User.findOne({
      email: req.body.email
    });
    if(user.movies.length<=5)
      return res.status(400).json({msg: "Minimum five movies are required for recommendation!!"});
    user.movies=user.movies.filter((item) => item.id !== req.body.id);
    await user.save();
    return res.status(200).json({msg: "Movie Removed"});
   } catch (err) {
    return res.status(400).json({error: err});
  }
}

module.exports = exports;