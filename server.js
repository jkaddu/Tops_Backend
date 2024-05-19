const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const verifyJWT = require("./middleware/verifyJWT");
const PORT = process.env.PORT || 3000;

app.use(logger);

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

// serve static files aka applies the css,image or images and text
app.use("/", express.static(path.join(__dirname, "/public")));

// ROUTES
app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth"));
app.use(verifyJWT);
app.use("/users", require("./routes/getUsers"));

app.use(errorHandler);
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
