const UserData = require("../models/UserModels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = (req, res, next) => {
  let userEmailId = req.body.userEmailId ? req.body.userEmailId : "";

  UserData.findOne({ userEmailId: userEmailId })
    .then((user) => {
      if (user) {
        res.json({
          message: `${userEmailId} is Alredy Registerd In Systm`,
        });
      } else {
        bcrypt.hash(req.body.userPassword, 10, function (error, hashedPass) {
          if (!error) {
            let userInfo = new UserData({
              userName: req.body.userName,
              userEmailId: req.body.userEmailId,
              userPassword: hashedPass,
              userAge: req.body.userAge,
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
          } else {
            res.json({
              message: `An Error in show: ${error}`,
            });
          }
        });
      }
    })
    .catch((error) => {
      res.json({
        message: `An Error in Register user: ${error}`,
      });
    });
};

const loginUser = (req, res, next) => {
  let userEmailId = req.body.userEmailId ? req.body.userEmailId : "";
  let userPassword = req.body.userPassword ? req.body.userPassword : "";
  UserData.findOne({ userEmailId: userEmailId })
    .then((user) => {
      if (user) {
        bcrypt.compare(
          userPassword,
          user.userPassword,
          function (error, result) {
            if (error) {
              res.json({
                message: `An Error in Login: ${error}`,
              });
            }
            if (result) {
              let toke = jwt.sign({ userName: user.userName }, "RadheRadhe", {
                expiresIn: "2h",
              });
              let refToke = jwt.sign(
                { userName: user.userName },
                "RadheRadhe",
                {
                  expiresIn: "48h",
                }
              );
              res.json({
                message: `${userEmailId} is login`,
                toke,
                refToke,
              });
            } else {
              res.json({
                message: `${user.userName} your password in inCorrect`,
              });
            }
          }
        );
      } else {
        res.json({
          message: `${userEmailId} is not Registerd In Systm`,
        });
      }
    })
    .catch((error) => {
      res.json({
        message: `An Error in Login: ${error}`,
      });
    });
};

// Add New User

module.exports = {
  register,
  loginUser,
};
