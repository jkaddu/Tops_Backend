const User = require("../model/User");

const handleLogout = async (req, res) => {
  // on client, delete accessToken
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);
  const refreshToken = cookies.jwt;

  // Checking if refreshToken is in database
  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) {
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });
    return res.sendStatus(204);
  }

  // Delete refreshToken in database
  foundUser.refreshToken = "";
  const result = await foundUser.save();
  console.log(result);

  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "None",
    secure: true,
  });
  res.sendStatus(204);
};

module.exports = { handleLogout };
