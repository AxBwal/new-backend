const User = require("../Model/User.model");
const bcrypt = require("bcrypt");

exports.createuser = async (req, res) => {
  try {
    const { username, email, password, confirmpassword } = req.body;

    if (!username || !email || !password || !confirmpassword) {
      return res.status(401).json({
        success: false,
        message: "All fileds are required",
      });
    }

    const olduser = await User.findOne({email});
    if (olduser) {
      return res.status(401).json({
        success: false,
        message: "Please Login . You are old user",
      });
    }

    if (password !== confirmpassword) {
      return res.status(401).json({
        success: false,
        message: "Password is not same as confirmpassword",
      });
    }

    let hashedPassword;

    try {
      hashedPassword =await bcrypt.hash(password, 10);
      if (!hashedPassword) {
        return res.status(401).json({
          success: false,
          message: "Unable to hash the password",
        });
      }
    } catch (error) {
      console.log(error);
    }

    const newuser = await User.create({
      username,
      email,
      password: hashedPassword,
      confirmpassword: hashedPassword,
    });

    return res.status(200).json({
      success: true,
      newuser,
      message: "User created SuccessFully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "User not created SuccessFully",
    });
  }
};
