import User from "../Models/user.model.js";
import bcrypt from "bcryptjs";

const signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    let user = await User.findOne({ email: email, username: username });
    if (user) {
      return res.status(500).json({ message: "User already exists" });
    }
    let hashedPassword = bcrypt.hashSync(password, 10); //Sync in hashSync is "already" using "await" inside it
    user = new User({ username, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
export default signup;
