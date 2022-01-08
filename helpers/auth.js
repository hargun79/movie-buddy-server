const jwt = require('jsonwebtoken');
const db = require("../models");

exports.signup = async function(req, res) {
  try {
    let user = await db.User.create(req.body);
    let uuid = await db.UniqueUserId.findOne();
    user.userId=uuid.currentMaxUserId;
    uuid.currentMaxUserId+=1;
    await uuid.save();
    await user.save();
    let { id, username, admin, userId, email } = user;
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
      email,
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
}

exports.signin = async function(req, res) {
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
}

module.exports = exports;