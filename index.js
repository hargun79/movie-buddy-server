var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const db = require("./models");
const jwt = require("jsonwebtoken");

const auth = require('./middlewares/is-Auth');

// User Routes

app.post('/signup',async function(req,res){
  try {
    let user = await db.User.create(req.body);
    let uuid = await db.UniqueUserId.findOne();
    user.userId=uuid.currentMaxUserId;
    uuid.currentMaxUserId+=1;
    await uuid.save();
    await user.save();
    let { id, username, admin, userId } = user;
    let token = jwt.sign(
      {
        id,
        username,
        admin
      },
      "abcdefghijklmnopqrstuvwxyz"
    );
    return res.status(200).json({
      id,
      username,
      userId,
      token
    });
  } catch (err) {
    if (err.code === 11000) {
      err.message = "Sorry, that username and/or email is taken";
    }
    return res.status(400).json({
      status: 400,
      message: err.message
    });
  }
});

app.post('/signin',async function(req,res){
  try {
    let user = await db.User.findOne({
      email: req.body.email
    });
    let { id, username, admin, userId, email } = user;
    let isMatch = await user.comparePassword(req.body.password);
    if (isMatch) {
      let token = jwt.sign(
        {
          id,
          username,
          admin
        },
        "abcdefghijklmnopqrstuvwxyz"
      );
      return res.status(200).json({
        userId,
        username,
        email,
        token
      });
    } else {
      return next({
        status: 400,
        message: "Invalid Email/Password."
      });
    }
  } catch (e) {
    return res.status(400).json({ status: 400, message: "Invalid Email/Password." });
  }
});

app.post('/usermovie', auth.userAuth, async function(req,res){
  try {
    let user = await db.User.findOne({
      email: req.body.email
    });
    var movieIds=req.body.movieIds;
    for(var i=0;i<movieIds.length;i++)
    {
     let movie = await db.Movie.findOne({
      movieId: movieIds[i]
     });
     user.movies.push(movie._id);
    }
    await user.save();
    return res.status(200).json({msg: "Movies Added"});
   } catch (err) {
    return res.status(400).json({error: err});
  }
});

app.delete('/usermovie', auth.userAuth, async function(req,res){
  try {
    let user = await db.User.findOne({
      email: req.body.email
    });
    let movie = await db.Movie.findOne({
      movieId: req.body.movieId
    });
    user.movies.remove(movie._id);
    await user.save();
    return res.status(200).json(movie);
   } catch (err) {
    return res.status(400).json({error: err});
  }
});

// Admin Routes

app.put('/setuuid',auth.adminAuth, async function(req,res){
  try {
    let uuid = await db.UniqueUserId.findOne({});
    uuid.currentMaxUserId = req.body.uuid;
    await uuid.save();
    return res.status(200).json(uuid);
   } catch (err) {
    return res.status(400).json({error: err});
  }
});

app.post('/movie', auth.adminAuth, async function(req,res){
  try {
    let movie = await db.Movie.create({
      movieId: req.body.movieId,
      title: req.body.title,
      date: req.body.date,
      imdb: req.body.imdb,
      Genre: req.body.Genre 
    });
    return res.status(200).json(movie);
   } catch (err) {
    return res.status(400).json({error: err});
  }
});

app.delete('/movie', auth.adminAuth, async function(req,res){
  try {
    let movie = await db.Movie.findOneAndDelete({
      movieId: req.body.movieId
    });
    return res.status(200).json({msg: "Deleted"});
   } catch (err) {
    return res.status(400).json({error: err});
  }
});

app.listen(process.env.PORT || 3000,function(req,res){
  console.log("Server Started!!");
});