require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const verifyJWT = require("./middleware/verifyJWT");
const cookieParser = require("cookie-parser");
const credentials = require("./middleware/credentials");
const mongoose = require("mongoose");
const connectDB = require("./config/dbConnect");
const PORT = process.env.PORT || 3001;

// Connect to MongoDB
connectDB();
// custom middleware for logging request
app.use(logger);
// handles options credentials check before cors and fetches cookies credentials requirement
app.use(credentials);
// Cross Origin Resource Sharing
app.use(cors(corsOptions));
// middleware for form data
app.use(express.urlencoded({ extended: false }));
// middleware for JSON
app.use(express.json());
// middleware for cookies
app.use(cookieParser());

// serve static files aka applies the css,image or images and text
app.use("/", express.static(path.join(__dirname, "/public")));

// ROUTES
app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth"));
app.use("/refresh", require("./routes/refresh"));
app.use("/logout", require("./routes/logout"));

app.use(verifyJWT);
app.use("/movies", require("./routes/movieAPI/movies"));
app.use("/users", require("./routes/userAPI/users"));

// custom middleware for handling errors
app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on ${PORT}`));
});
