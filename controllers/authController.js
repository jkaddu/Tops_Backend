const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const bcrypt = require("bcrypt");

const handleLogin = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ message: "Username and password required." });
  const foundUser = usersDB.users.find(
    (person) => person.username === username
  );
  if (!foundUser) return res.sendStatus(401);

  const match = await bcrypt.compare(password, foundUser.password);
  if (match) {
    res.json({ success: `${username} is logged in.` });
  } else {
    res.sendStatus(401);
  }
};

module.exports = { handleLogin };
