const { response } = require("express");
const UserData = require("../models/UserModels");

// Show The list of user
const index = (req, res, next) => {
  UserData.find()
    .then((response) => {
      res.json({
        response,
      });
    })
    .catch((error) => {
      res.json({
        message: `An Error in index: ${error}`,
      });
    });
};

const show = (req, res, next) => {
  let userEmailId = req.body.userEmailId;
  UserData.findOne({ userEmailId: userEmailId })
    .then((response) => {
      res.json({
        response,
      });
    })
    .catch((error) => {
      res.json({
        message: `An Error in show: ${error}`,
      });
    });
};

// Add New User
const store = (req, res, next) => {
  let userInfo = new UserData({
    userName: req.body.name,
    userEmailId: req.body.emailId,
    userPassword: req.body.password,
    userAge: req.body.age,
    userIsActive: req.body.userIsActive ? req.body.userIsActive : 0,
  });
  userInfo
    .save()
    .then((response) => {
      res.json({
        message: "User Addes In System",
      });
    })
    .catch((error) => {
      res.json({
        message: `An Error in store: ${error}`,
      });
    });
};

// update Emp
const updateUser = (req, res, next) => {
  let userEmailId = req.body.emailId;
  let updateUserInfo = {
    userName: req.body.name,
    userEmailId: req.body.emailId,
    userPassword: req.body.password,
    userAge: req.body.age,
    userIsActive: req.body.userIsActive ? req.body.userIsActive : 0,
  };

  UserData.findOneAndUpdate(userEmailId, { $set: updateUserInfo })
    .then((response) => {
      res.json({
        message: "User Updated In System",
      });
    })
    .catch((error) => {
      res.json({
        message: `An Error in updateUser: ${error}`,
      });
    });
};

// Delet User
const destroy = (req, res, next) => {
  let userEmailId = req.body.emailId;
  UserData.findOneAndRemove(userEmailId)
    .then((response) => {
      res.json({
        message: "User delete In System",
      });
    })
    .catch((error) => {
      res.json({
        message: `An Error in destroy: ${error}`,
      });
    });
};

module.exports = {
  index,
  show,
  store,
  updateUser,
  destroy,
};
