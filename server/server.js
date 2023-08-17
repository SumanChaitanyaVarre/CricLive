const express = require('express');
const app = express();

require("dotenv").config();

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,            //access-control-allow-credentials:true
    exposedHeaders: ['Set-Cookie'],
};

const cors = require("cors");
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const path = require("path");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const session = require('express-session');
app.use(session({
    // store: new File_Store,
    name: "session",
    secret: "mysecret",
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    resave: false
}));

const routes = require("./routes");
app.use("/", routes);


app.listen(8080, () => {
    console.log("server has started on port 8080");
});