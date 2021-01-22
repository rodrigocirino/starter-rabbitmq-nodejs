const express = require("express");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config({ debug: process.env.DEBUG });

const { json, urlencoded } = express;

const app = express();

app.use(json());
app.use(urlencoded({ extended: false }));

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

const router = require("./src/routes");
app.use(router);

app.use("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/src/html/index.html"));
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
