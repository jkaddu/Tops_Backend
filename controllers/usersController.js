const User = require("../model/User");

const getUsers = async (req, res) => {
  const users = await User.find();
  if (!users) return res.status(204).json({ message: "No users found" });
  res.json(users);
};

const getUser = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "User ID required!" });

  const user = await User.findOne({ _id: req.params.id }).exec();
  if (!user)
    return res.status(204).json({ message: `UserID ${req.params.id}` });
  res.json(user);
};

const updateUsername = async (req, res) => {
  if (!req?.body?.id)
    return res.status(400).json({ message: "ID parameter is required!" });
  const user = await User.findOne({ _id: req.body.id }).exec();
  if (!user) {
    return res
      .status(204)
      .json({ message: `User ID ${req.body.id} not found.` });
  }
  if (req.body?.username) user.username = req.body.username;
  const result = await user.save();
  res.json(result);
};

const deleteUser = async (req, res) => {
  if (!req?.body?.id)
    return res.status(400).json({ message: "User ID required!" });

  const user = await User.findOne({ _id: req.body.id }).exec();
  if (!user) {
    return res
      .status(204)
      .json({ message: `User ID ${req.body.id} is not on record.` });
  }
  const result = await User.deleteOne({ _id: req.body.id });
  res.json(result);
};

module.exports = { getUsers, getUser, updateUsername, deleteUser };
