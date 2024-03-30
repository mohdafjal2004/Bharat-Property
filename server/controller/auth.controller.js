import User from "../Models/user.model.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    let user = await User.findOne({ email: email, username: username });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    let hashedPassword = bcrypt.hashSync(password, 10); //Sync in hashSync is "already" using "await" inside it
    user = new User({ username, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    next(error);
    //Using the middleware from the index.js
  }
};

const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return next(errorHandler(404, "User not found"));
    }
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) return next(errorHandler(404, "Wrong credentials"));
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = user._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
    //Using the middleware from the index.js
  }
};
export { signup, signin };
