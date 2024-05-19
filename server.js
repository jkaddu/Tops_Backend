const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const { logger } = require("./middleware/logEvents");
const PORT = process.env.PORT || 3000;

app.use(logger);

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
