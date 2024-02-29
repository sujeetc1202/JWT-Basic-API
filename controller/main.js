// check username, password in post(login) request
// if exists create new JWT
// send back to front end

// setup authentication so only therequest with JWT can acess the dashboard
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");

const login = async (req, res) => {
  const { username, password } = req.body;
  // validations using
  // mongoose validation
  // Joi
  // custom check in the controller
  if (!username || !password) {
    throw new BadRequestError("Please provide email and password");
  }

  // just for demo, normally provided by DB
  const id = new Date().getDate();
  // try to keep payload small, better experience for user
  // jwt.sign(payload, secret, optionsObject)
  // just for demo, in production use long, complex and unguessablestring value !!!!!!
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  res.status(StatusCodes.OK).json({ msg: "user created", token });
};

const dashboard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(StatusCodes.OK).json({
    msg: `Hello ${req.user.username}`,
    secret: `Here is your authorized data, your lucky number is : ${luckyNumber}`,
  });
};

module.exports = { login, dashboard };
