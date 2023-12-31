const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const router = require("./router/index");

const error = require("./middleware/error");
const requestArg = require("./middleware/requestArg");
const notFound = require("./middleware/404");
const auth = require("./middleware/auth");

const md5 = require("./utils/md5");

const { connectDB } = require("./model/index");
connectDB();
const PORT = process.env.PORT || 3001;

const app = express();

// console.log(md5("a111111"));

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.use(express.static("./public"));

app.use(auth());
// http arg
app.use(requestArg());

app.use("/api", router);

// 404
app.use(notFound());

// error
app.use(error());

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}/`));
