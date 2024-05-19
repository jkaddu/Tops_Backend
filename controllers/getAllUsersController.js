const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const getAllUsers = (req, res) => {
  res.json(usersDB.users);
};

module.exports = { getAllUsers };
