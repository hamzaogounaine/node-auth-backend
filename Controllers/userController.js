const User = require("../Models/User");
const jwt = require("jsonwebtoken");

const handleErrors = (err) => {
  const errors = { username: "", password: "", email: "" };

  if (err.name === "ValidationError") {
    for (const field in err.errors) {
      if (errors.hasOwnProperty(field)) {
        errors[field] = err.errors[field].message;
      }
    }
  }
  // Error handling for unique validation
  if (err.code === 11000) {
    const fieldMatch = err.message.match(/index: (.*?)_1/);
    const field = fieldMatch ? fieldMatch[1] : null;

    if (field) {
      errors[field] = `${field}Unique`;
    }
  }

  return errors;
};

const generateTokens = (user) => {
  const accessToken = jwt.sign(
    { userId: user._id },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
  );

  const refreshToken = jwt.sign(
    { userId: user._id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );

  return { accessToken, refreshToken };
};

const sendAuthResponse = async (res, user, accessToken, refreshToken) => {
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    // secure: true, // Use this in production (HTTPS)
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  // 2. Remove sensitive fields for the JSON response
  const userResponse = user.toObject({ getters: true });
  delete userResponse.refresh_token;
  delete userResponse.password; // If not already done in the Mongoose hook

  return res.status(200).json({ user: userResponse, accessToken });
};

const userSignUp = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({
      $or: [{ email: email }, { username: username }],
    });

    const createdUser = await User.create({ email, username, password });

    const { accessToken, refreshToken } = generateTokens(createdUser);

    const updatedUser = await User.findByIdAndUpdate(
      createdUser._id,
      { refresh_token: refreshToken },
      { new: true } // returns the updated document
    );

    return sendAuthResponse(res, updatedUser, accessToken, refreshToken);
  } catch (err) {
    console.log(err);
    const errors = handleErrors(err);
    return res.status(401).json(errors);
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const { accessToken, refreshToken } = generateTokens(user);

    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { refresh_token: refreshToken },
      { new: true } // returns the updated document
    );

    return sendAuthResponse(res, updatedUser, accessToken, refreshToken);
  } catch (err) {
    if (err.message === "invalidCredentials") {
      return res.status(401).json(err.message);
    }
    const errors = handleErrors(err);
    return res.status(401).json(errors);
  }
};

module.exports = { userSignUp, userLogin };
