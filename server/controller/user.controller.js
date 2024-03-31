import User from "../Models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcrypt from "bcryptjs";

const updateUser = async (req, res) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "You can update your own account"));
  try {
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        //$set methods gives flexibility to update one field and leave others or vice-versa
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      //{new:true} saves the updated information in the database
      //without it, it saves only the previous data in db
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "You can only delete your own account"));
  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie("access_token");
    res.status(200).json("User has been deleted")
  } catch (error) {
    next(error);
  }
};

export { updateUser, deleteUser };
