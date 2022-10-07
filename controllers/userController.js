const User = require("../models/userModel");
const bcrypt = require("bcrypt");

module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck)
      return res.json({
        message: "Username Already Exist",
        status: false,
      });
    const emailCheck = await User.findOne({ email });
    if (emailCheck)
      return res.json({
        message: "Email Already Exist",
        status: false,
      });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    });
    delete user.password;
    return res.json({
      status: true,
      message: "User Successfull Create",
      user: user,
    });
  } catch (error) {
    next(error)
  }
};

module.exports.login = async (req,res,next) => {
  try {
    const {email, password} = req.body
    const user = await User.findOne({email})
    if (!user) {
      return res.json({
        message: 'email invalid',
        status: false
      })
    }
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return res.json({
        message: 'password invalid',
        status: false
      })
    }
    delete user.password
    return res.json({
      status:true,
      user: user
    })
  } catch (error) {
    next(error)
  }
}

module.exports.setAvatar = async (req,res,next) => {
  try {
    const userId = req.params.id
    const avatarImage = req.body.avatarImage
    const userData = await User.findByIdAndUpdate(userId, {
      isAvatarImageSet: true,
      avatarImage
    });
    return res.json({
      isSet:userData.isAvatarImageSet,
      image:userData.avatarImage
    })
  } catch (error) {
    next(error)
  }
}

module.exports.getAllUsers = async (req,res,next) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id }}).select([
      "email",
      "username",
      "avatarImage",
      "_id"
    ])
    return res.json(users)
  } catch (error) {
    next(error)
  }
}
